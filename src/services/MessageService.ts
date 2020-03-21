import axios from "axios";
import { Op } from "sequelize";
import { services } from ".";
import { Message } from "../models/Message";
import { MessageAttachment } from "../models/MessageAttachment";
import { AttachmentType } from "../enums/AttachmentType";
import { User } from "../models/User";
import { UserToken } from "../models/UserToken";
import { SystemUser } from "../enums/SystemUser";
import { Notification } from "apn";
import { sendMessageToUserBySocket } from "../socket";

const howAreYouMessage = "Как сейчас настроение?";

async function nlpProcess(text: string, userId: number) {
    const user = await User.findByPk(userId);

    if (!user) {
        return;
    }

    const nlpResponse = await axios.post("http://localhost:3501/process", {
        context: `user/${userId}`,
        input: text,
        variables: {
            userName: user.firstName,
        },
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

    const nlpMessage = await services.message.send(SystemUser.System, userId, output, []);

    await nlpMessage.save();

    await Promise.all((actions as string[]).map(async (action) => {
        if (action === "saveUserProfile") {
            const { userName } = variables;

            user.firstName = userName;
        }

        await user.save();

        sendMessageToUserBySocket(userId, JSON.stringify({
            Profile: user.toJSON(),
        }));
    }));
}

export class MessageService {
    public async send(fromUserId: number, toUserId: number, text: string, attachments: MessageAttachment[]) {
        const message = new Message();

        message.fromUserId = fromUserId;
        message.toUserId = toUserId;
        message.text = text;

        await message.save();

        await Promise.all(attachments.map(async (attachment) => {
            attachment.messageId = message.id;

            await attachment.save();
        }));

        if (text && toUserId === SystemUser.System) {
            nlpProcess(text, fromUserId)
                .catch((e) => console.error("[NLP ERROR]", e instanceof Error ? e.message : e));
        }

        if (toUserId !== SystemUser.System) {
            this.newMessageNotification(message)
                .catch((e) => console.error("[NOTIFICATION ERROR]", e instanceof Error ? e.message : e));
        }

        return message;
    }

    public async newMessageNotification(message: Message) {
        const socketOk = sendMessageToUserBySocket(message.toUserId, JSON.stringify({
            Message: message.toJSON(),
        }));

        if (socketOk) {
            console.log("SOCKET SENT", message.toUserId);

            return true;
        }

        const notif = new Notification();

        notif.topic = "ru.sberbank.iHealthMonitor";
        notif.alert = {
            title: "Новое сообщение",
            body: message.text,
        };

        const pushOk = await services.push.sendToUser(message.toUserId, notif) > 0;

        if (pushOk) {
            console.log("APN SENT", message.toUserId);

            return true;
        }

        return false;
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
        return services.push.sendToUser(user.id, this.getHowAreYouNotification());
    }

    public async sendHowAreYouAll() {
        const users = await User.findAll({ where: {} });

        const justNotifications: Promise<any>[] = [];

        const activeUsers = (await Promise.all(users.map(async (user) => {
            if (user.id < 0) {
                return;
            }

            const exists = await Message.findOne({ where: {
                [Op.or]: [
                    {
                        fromUserId: user.id,
                    },
                    {
                        toUserId: user.id,
                    },
                ],
            }, include: [MessageAttachment], limit: 1, order: [["id", "DESC"]] });

            if (exists && exists.fromUserId === SystemUser.System) {
                const [attachement]: MessageAttachment[] = exists["MessageAttachments"] || [];

                if (attachement && attachement.type === AttachmentType.MoodRequest) {
                    // Если сообщение уже весит, то отправляем нофтификацию.
                    justNotifications.push(this.newMessageNotification(exists));

                    return;
                }
            }

            return user;
        }))).filter<User>(Boolean as any);

        await Promise.all(activeUsers.map(async (user) => {
            const requestAttachment = new MessageAttachment();

            requestAttachment.type = AttachmentType.MoodRequest;

            await this.send(SystemUser.System, user.id, howAreYouMessage, [requestAttachment]);
        }));

        // Ждем, когда будут отправлены все повторные оповещения.
        await Promise.all(justNotifications);

        return {
            users: activeUsers.length,
            justNotifications: justNotifications.length,
        };
    }
}
