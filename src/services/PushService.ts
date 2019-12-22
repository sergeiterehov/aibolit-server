import { Provider, Notification } from "apn";
import { User } from "../models/User";
import { UserToken } from "../models/UserToken";
import { Message } from "../models/Message";
import { SystemUser } from "../enums/SystemUser";

const howAreYouMessage = "Как сейчас настроение?";

export interface IPushServiceConfig {
    certPemFile: string;
    keyPemFile: string;
}

export class PushService {
    private provider: Provider;

    constructor(config: IPushServiceConfig) {
        this.provider = new Provider({
            cert: config.certPemFile,
            key: config.keyPemFile,
            production: true,
        });
    }

    public getHowAreYouNotification() {
        const notif = new Notification();

        notif.topic = "ru.sberbank.iHealthMonitor";
        notif.alert = {
            title: "У вас новое сообщение",
            body: howAreYouMessage,
        };

        return notif;
    }

    public async sendHowAreYouByUser(user: User) {
        const tokenModels = await UserToken.findAll({ where: { userId: user.id } });
        const tokens = tokenModels.map((model) => model.token);

        const notif = this.getHowAreYouNotification();
        const response = await this.send(notif, tokens);

        return response.sent.length;
    }

    public async sendHowAreYouAll() {
        const tokens = await UserToken.findAll({ where: {} });
        const notif = this.getHowAreYouNotification();

        const usersWithMessage: number[] = [];

        async function sendMessageToUser(userId: number) {
            if (usersWithMessage.includes(userId)) {
                return;
            }

            usersWithMessage.push(userId);

            const message = new Message();

            message.fromUserId = SystemUser.System;
            message.toUserId = userId;
            message.text = howAreYouMessage;

            await message.save();
        }

        await Promise.all(tokens.map(async (token) => {
            await sendMessageToUser(token.userId);

            await this.send(notif, token.token);
        }));

        return tokens.length;
    }

    public async send(notif: Notification, deviceToken: string|string[]) {
        return await this.provider.send(notif, deviceToken);
    }
}
