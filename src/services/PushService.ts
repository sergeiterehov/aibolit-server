import { Provider, Notification } from "apn";
import { UserToken } from "../models/UserToken";

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

    public async sendToUser(userId: number, notif: Notification) {
        const tokenModels = await UserToken.findAll({ where: { userId } });
        const tokens = tokenModels.map((model) => model.token);

        const response = await this.send(notif, tokens);

        return response.sent.length;
    }

    public async send(notif: Notification, deviceToken: string|string[]) {
        return await this.provider.send(notif, deviceToken);
    }
}
