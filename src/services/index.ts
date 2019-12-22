import { PushService } from "./PushService";
import { AuthService } from "./AuthService";

export const services = {
    push: new PushService({
        certPemFile: "/var/certs/telemed-apn-cert.pem",
        keyPemFile: "/var/certs/telemed-apn-key.pem",
    }),
    auth: new AuthService(),
};
