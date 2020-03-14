import axios from "axios";
import { Message } from "../models/Message";
import { MessageAttachment } from "../models/MessageAttachment";
import { SystemUser } from "../enums/SystemUser";
import { sendMessageToUserBySocket } from "../socket";
import { services } from ".";
import { Notification } from "apn";

async function nlpProcess(text: string, userId: number) {
    const nlpResponse = await axios.post("http://localhost:3501/process", {
        context: `user/${userId}`,
        input: text,
    }, {
        timeout: 10000,
    });

    if (nlpResponse.status !== 200) {
        return;
    }

    const nlpResponseData = nlpResponse.data;

    const nlpMessage = await services.message.send(SystemUser.System, userId, nlpResponseData.output, []);

    await nlpMessage.save();
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
            return true;
        }

        const notif = new Notification();

        notif.topic = "ru.sberbank.iHealthMonitor";
        notif.alert = {
            title: "Новое сообщение",
            body: message.text,
        };

        const pushOk = await services.push.sendToUser(message.toUserId, new Notification()) > 0;

        if (pushOk) {
            return true;
        }

        return false;
    }
}
