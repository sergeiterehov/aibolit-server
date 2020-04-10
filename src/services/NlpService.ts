import axios from "axios";
import { User } from "../models/User";
import { Indicator } from "../models/Indicator";
import { services } from ".";
import { SystemUser } from "../enums/SystemUser";
import { sendMessageToUserBySocket } from "../socket";

export class NlpService {
    async process(text: string, userId: number) {
        const user = await User.findByPk(userId);
    
        if (!user) {
            return;
        }
    
        const userIndicators = await Indicator.findActualsByUser(userId);
        const globalIndicators = await Indicator.findActualsGlobal();
    
        const indicators = [
            ...globalIndicators,
            ...userIndicators,
        ].reduce((list: Record<string, string>, ind) => ({
            ...list,
            [`${ind.userId ? "user" : "global"}${ind.key}`]: ind.value,
        }), {});

        const inputVariables = {
            ...indicators,
            userName: user.firstName || undefined,
        };
    
        const nlpResponse = await axios.post("http://localhost:3501/process", {
            context: `user/${userId}`,
            input: text,
            variables: inputVariables,
        }, {
            timeout: 10000,
        });
    
        const nlpResponseData = nlpResponse.data;
    
        if (nlpResponse.status !== 200) {
            console.log("[NLP ERROR]", userId, user.email, nlpResponseData);
    
            return;
        }
    
        console.log("[NLP RESPONSE]", userId, user.email, nlpResponseData);
    
        const { output, variables, actions } = nlpResponseData;

        await (actions as string[])
        // Убираем дубли!
        .reduce((list: string[], item) => list.includes(item) ? list : [...list, item], [])
        .map(async (action) => {
            const updateUser = async () => {
                await user.save();
    
                sendMessageToUserBySocket(userId, JSON.stringify({
                    Profile: user.toJSON(),
                }));
            }
    
            if (action === "saveUserProfile") {
                const { userName } = variables;
    
                user.firstName = userName;
    
                await updateUser();
            }
    
            if (action === "clearUser") {
                user.firstName = null;
    
                await updateUser();
            }
    
            if (action === "saveUserIndicators") {
                await Promise.all(Object
                    .entries<string>(variables)
                    .filter(([key]) => key.indexOf("user") === 0)
                    //Должен измениться относительно входных данных.
                    .filter(([key, value]) => value !== inputVariables[key])
                    .map(([key, value]) => [key.substr(4), value])
                    .map(async ([key, value]) => {
                        const ind = new Indicator();
    
                        ind.userId = user.id;
                        ind.key = key;
                        ind.value = value;
    
                        await ind.save();
                    }));
            }
        })
        // Сворачиваем в промис.
        .reduce((all: any, item, i, list) => all || Promise.all(list), null);
    
        await services.message.send(SystemUser.System, userId, output, []);
    }
}