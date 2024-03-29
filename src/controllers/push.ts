import { Router } from "express";
import { Notification } from "apn";
import { withUserAutentication } from "../middlewares/withUserAutentication";
import { UserToken } from "../models/UserToken";
import { services } from "../services";
import { withErrorHandler, ExistsHttpError, RequestHttpError } from "../middlewares/withErrorHandler";
import { withSchema } from "../middlewares/withSchema";

const router = Router().use(withUserAutentication);

router.post("/refresh-device-token", withSchema({
    type: "object",
    properties: {
        token: {
            type: "string",
        },
    },
    required: ["token"],
}), withErrorHandler(async (req, res) => {
    const token = req.body.token;
    const userId = req.user.id;

    const existsToken = await UserToken.findOne({ where: { userId, token } });

    if (existsToken) {
        throw new RequestHttpError("TOKEN_ALREADY_EXISTS");
    }

    const newToken = new UserToken({ userId, token });

    await newToken.save();

    res.send({ ok: true });
}));

router.post("/clean-all", withErrorHandler(async (req, res) => {
    const userId = req.user.id;
    const number = await UserToken.destroy({ where: { userId } });

    res.send({ ok: true, number });
}));

router.post("/test", withErrorHandler(async (req, res) => {
    const userId = req.user.id;

    const tokens = await UserToken.findAll({ where: { userId } });

    if (!tokens.length) {
        throw new ExistsHttpError("TOKENS_NOT_FOUND");
    }

    const results: any[] = [];

    await Promise.all(tokens.map(async (token) => {
        const notif = new Notification();

        notif.topic = "ru.sberbank.iHealthMonitor";
        notif.alert = {
            title: "У вас новое тестовое сообщение",
            body: "Как сейчас настроение?",
        };

        const response = await services.push.send(notif, token.token);

        results.push(response)
    }));

    res.send({ ok: true, results })
}));

export default router;
