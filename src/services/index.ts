import { PushService } from "./PushService";
import { AuthService } from "./AuthService";

export const services = {
    push: new PushService({
        certPemFile: `${process.platform === "win32" ? "D:" : "/var"}/certs/telemed-apn-cert.pem`,
        keyPemFile: `${process.platform === "win32" ? "D:" : "/var"}/certs/telemed-apn-key.pem`,
    }),
    auth: new AuthService(),
};
