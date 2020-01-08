import { Router } from "express";
import { withValidationSchema, withSchema } from "../middlewares/withSchema";
import { User } from "../models/User";
import { services } from "../services";
import { withUserAutentication } from "../middlewares/withUserAutentication";
import { withErrorHandler, AccessHttpError, ExistsHttpError } from "../middlewares/withErrorHandler";

const router = Router();

/**
 * Правила формирования пароля на клиенте:
 * sha1(sha1("SaltThisPlease") + ":" + $password)
 */
router.post("/classic", withSchema({
    type: "object",
    properties: {
        email: { type: "string" },
        password: {
            type: "string",
            minLength: 40,
            maxLength: 40,
        }
    },
    required: [ "email", "password" ],
}), withErrorHandler(async (req, res) => {
    const { password, email } = req.body;

    const user = await User.findOne({where: {email}});

    if (!user) {
        throw new ExistsHttpError("USER_NOT_FOUND");
    }

    if (!user.validatePassword(password)) {
        throw new AccessHttpError("PASSWORD_IS_INVALID");
    }

    const accessToken = services.auth.generateAccessToken(user.id);

    res.send({ok: true, accessToken});
}));

router.use("/test", withUserAutentication, (req, res) => {
    res.send({userDetected: Boolean(req.user)})
});

export default router;
