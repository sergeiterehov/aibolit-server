import { Provider, Notification } from "apn";
import { UserToken } from "../models/UserToken";
import { User } from "../models/User";

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
            body: "Как сейчас настроение?",
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
        const tokenModels = await UserToken.findAll({ where: {} });
        const tokens = tokenModels.map((model) => model.token);

        const notif = this.getHowAreYouNotification();
        const response = await this.send(notif, tokens);

        return response.sent.length;
    }

    public async send(notif: Notification, deviceToken: string|string[]) {
        return await this.provider.send(notif, deviceToken);
    }
}
