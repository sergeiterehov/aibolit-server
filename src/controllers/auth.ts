import { Router } from "express";
import { withSchema } from "../middlewares/withSchema";
import { User } from "../models/User";
import { services } from "../services";
import { withUserAutentication } from "../middlewares/withUserAutentication";

const router = Router();

/**
 * Правила формирования пароля на клиенте:
 * sha1(sha1("SaltThisPlease") + ":" + $password)
 */
router.post("/classic", withSchema({
    email: {
        isString: true,
    },
    password: {
        isLength: {options: {min: 40, max: 40}},
        isLowercase: true,
    }
}), async (req, res) => {
    const { password, email } = req.body;

    const user = await User.findOne({where: {email}});

    if (!user) {
        return res.status(403).send({error: "USER_NOT_FOUND"});
    }

    if (!user.validatePassword(password)) {
        return res.status(403).send({error: "PASSWORD_IS_INVALID"});
    }

    const accessToken = services.auth.generateAccessToken(user.id);

    res.send({ok: true, accessToken});
});

router.use("/test", withUserAutentication, (req, res) => {
    res.send({userDetected: Boolean(req.user)})
});

export default router;
