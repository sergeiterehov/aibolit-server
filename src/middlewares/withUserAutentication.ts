import { User } from "../models/User";
import { RequestHandler } from "express";

export const withUserAutentication: RequestHandler = async (req, res, next) => {
    const email = req.body && req.body.email;

    if (!email) {
        return res.status(400).send({
            error: "В корневом объекте не дайдено поле email",
        });
    }

    const user = (await User.findOne({where: {email}})) || (await User.create({email}));

    if (!user) {
        return res.status(403).send({
            error: "Пользователь с таким email не найден",
        });
    }

    req.user = user;

    next();
}
