import { Router } from "express";
import { Provider, Notification } from "apn";
import { withUserAutentication } from "../middlewares/withUserAutentication";
import { UserToken } from "../models/UserToken";

const provider = new Provider({
    cert: "/var/certs/telemed-apn-cert.pem",
    key: "/var/certs/telemed-apn-key.pem",
    production: true,
});

const router = Router().use(withUserAutentication);

router.post("/refresh-device-token", async (req, res) => {
    const token = req.body.token;
    const userId = req.user.id;

    const existsToken = await UserToken.findOne({ where: { userId, token } });

    if (existsToken) {
        return res.send({ ok: true, but: "TOKEN_ALREADY_EXISTS" });
    }

    const newToken = new UserToken({ userId, token });

    await newToken.save();

    res.send({ ok: true });
});

router.post("/clean-all", async (req, res) => {
    const userId = req.user.id;
    const number = await UserToken.destroy({ where: { userId } });

    res.send({ ok: true, number });
});

router.post("/test", async (req, res) => {
    const userId = req.user.id;

    const tokens = await UserToken.findAll({ where: { userId } });

    if (!tokens.length) {
        return res.send({ ok: true, but: "TOKENS_NOT_FOUND" })
    }

    const results: any[] = [];

    await Promise.all(tokens.map(async (token) => {
        const notif = new Notification();

        notif.topic = "ru.sberbank.iHealthMonitor";
        notif.alert = "Hello!";

        const response = await provider.send(notif, token.token);

        results.push(response)
    }));

    res.send({ ok: true, results })
});

export default router;
