import { PushService } from "./PushService";

export const services = {
    push: new PushService({
        certPemFile: "/var/certs/telemed-apn-cert.pem",
        keyPemFile: "/var/certs/telemed-apn-key.pem",
    }),
};
