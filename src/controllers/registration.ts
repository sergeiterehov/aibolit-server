import { Router } from "express";
import { User } from "../models/User";
import { withSchema } from "../middlewares/withSchema";
import { withErrorHandler, RequestHttpError } from "../middlewares/withErrorHandler";

const router = Router();

router.post("/", withSchema({
    email: {
        isEmail: true,
    },
    password: {
        isLength: {options: {min: 40, max: 40}},
        isLowercase: true,
    },
}), withErrorHandler(async (req, res) => {
    if (req.user) {
        throw new RequestHttpError("ALREADY_AUTH");
    }

    const { email, password } = req.body;

    const existsUser = await User.findOne({where: {email: email}});

    if (existsUser) {
        throw new RequestHttpError("EMAIL_EXISTS");
    }

    const user = new User();

    user.email = email;
    user.setPassword(password);

    await user.save();

    return res.send({ok: true, id: user.id});
}));

export default router;
