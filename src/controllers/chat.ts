import { Router } from "express";
import { withUserAutentication } from "../middlewares/withUserAutentication";
import { Message } from "../models/Message";
import { Op } from "sequelize";
import { User } from "../models/User";

const router = Router().use(withUserAutentication);

router.post("/with", async (req, res) => {
    const withUserId = req.body.userId !== undefined ? Number(req.body.userId) : undefined;

    if (undefined === withUserId) {
        return res.status(400).send({ error: "USER_ID_REQUIRED" });
    }

    const withUser = await User.findOne({where: { id: withUserId }});

    if (!withUser) {
        return res.status(404).send({ error: "USER_NOT_FOUND" });
    }

    const user = req.user;

    const messages = await Message.findAll({ where: {
        [Op.or]: [
            {
                fromUserId: user.id,
                toUserId: withUser.id,
            },
            {
                fromUserId: withUser.id,
                toUserId: user.id,
            },
        ],
    } })

    res.send({
        users: [ user, withUser ],
        yourId: user.id,
        messages,
    });
});

router.post("/send", async (req, res) => {
    const text = req.body.text;

    if (!text) {
        return res.status(400).send({ error: "TEXT_REQUIRED" });
    }

    const toUserId = req.body.userId !== undefined ? Number(req.body.userId) : undefined;

    if (undefined === toUserId) {
        return res.status(400).send({ error: "USER_ID_REQUIRED" });
    }

    const toUser = await User.findOne({where: { id: toUserId }});

    if (!toUser) {
        return res.status(404).send({ error: "USER_NOT_FOUND" });
    }

    const fromUser = req.user;

    const message = new Message();

    message.fromUserId = fromUser.id;
    message.toUserId = toUser.id;
    message.text = text;

    await message.save();

    res.send({ ok: true, id: message.id });
});

export default router;
