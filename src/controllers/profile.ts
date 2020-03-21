import { Router } from "express";
import { isString } from "util";
import { withErrorHandler } from "../middlewares/withErrorHandler";
import { withUserAutentication } from "../middlewares/withUserAutentication";
import { withSchema } from "../middlewares/withSchema";
import { Gender } from "../enums/Gender";

const router = Router().use(withUserAutentication);

router.get("/me", withErrorHandler(async (req, res) => {
    res.send({
        user: req.user.toJSON(),
    });
}));

router.post("/me", withSchema({
    type: "object",
    properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        middleName: { type: "string" },

        gender: { type: "string", enum: Object.values(Gender).filter(isString) },

        birthDate: { type: "date" },
    },
}), withErrorHandler(async (req, res) => {
    const user = req.user;

    const { firstName, lastName, middleName, gender, birthDate } = req.body;

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.middleName = middleName || user.middleName;

    user.gender = gender ? Number(Gender[gender]) : user.gender;

    user.birthDate = birthDate || user.birthDate;

    if (user.changed()) {
        await user.save();
    }

    res.send({
        ok: true,
    });
}));

export default router;
