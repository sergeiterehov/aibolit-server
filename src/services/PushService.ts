import { Provider, Notification, token } from "apn";
import { User } from "../models/User";
import { UserToken } from "../models/UserToken";
import { Message } from "../models/Message";
import { SystemUser } from "../enums/SystemUser";
import { MessageAttachment } from "../models/MessageAttachment";
import { AttachmentType } from "../enums/AttachmentType";

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

    public async sendToUser(userId: number, notif: Notification) {
        const tokenModels = await UserToken.findAll({ where: { userId } });
        const tokens = tokenModels.map((model) => model.token);

        const response = await this.send(notif, tokens);

        return response.sent.length;
    }

    public async sendHowAreYouByUser(user: User) {
        return this.sendToUser(user.id, this.getHowAreYouNotification());
    }

    public async sendHowAreYouAll() {
        const users = await User.findAll({ where: {} });
        
        const notif = this.getHowAreYouNotification();
        let count = 0;

        await Promise.all(users.map(async (user) => {
            const message = new Message();

            message.fromUserId = SystemUser.System;
            message.toUserId = user.id;
            message.text = howAreYouMessage;

            await message.save();

            const requestAttachment = new MessageAttachment();

            requestAttachment.messageId = message.id;
            requestAttachment.type = AttachmentType.MoodRequest;

            await requestAttachment.save();

            const tokens = await UserToken.findAll({ where: {
                userId: user.id,
            } });

            if (!tokens.length) {
                return;
            }

            await Promise.all(tokens.map(async (token) => {
                await this.send(notif, token.token);
            }));

            count += tokens.length;
        }));

        return count;
    }

    public async send(notif: Notification, deviceToken: string|string[]) {
        return await this.provider.send(notif, deviceToken);
    }
}
