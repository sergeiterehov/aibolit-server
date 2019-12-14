import { Router } from "express";
import { withUserAutentication } from "../middlewares/withUserAutentication";
import { Message } from "../models/Message";
import { Op } from "sequelize";
import { checkSchema, validationResult } from "express-validator";
import { User } from "../models/User";
import { AttachmentType } from "../enums/AttachmentType";
import { MessageAttachment } from "../models/MessageAttachment";

const router = Router().use(withUserAutentication);

router.post("/with", ...checkSchema({
    userId: {
        isInt: true,
    },
}), async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).send(validationResult(req).array());
    }

    const withUserId = req.body.userId;

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
    }, include: [MessageAttachment], order: [["id", "DESC"]], limit: 100 })

    res.send({
        users: [ user, withUser ],
        yourId: user.id,
        messages,
    });
});

router.post("/send", ...checkSchema({
    userId: {
        isInt: true,
    },
    text: {
        isString: true,
    },
    attachments: {
        isArray: true,
    },
    "attachments.*.type": {
        isString: true,
        isIn: {
            options: [Object.keys(AttachmentType)],
        },
    },
    "attachments.*.resource": {
        isString: true,
    },
}), async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).send(validationResult(req).array());
    }

    const { userId, text, attachments } = req.body;

    const toUser = await User.findOne({where: { id: userId }});

    if (!toUser) {
        return res.status(404).send({ error: "USER_NOT_FOUND" });
    }

    const fromUser = req.user;

    const message = new Message();

    message.fromUserId = fromUser.id;
    message.toUserId = toUser.id;
    message.text = text;

    await message.save();

    for (const attachmentItem of attachments) {
        const attachment = new MessageAttachment();

        attachment.messageId = message.id;
        // TODO: fix it shit
        attachment.type = AttachmentType[attachmentItem.type as string];
        attachment.resource = attachmentItem.resource;

        await attachment.save();
    }

    res.send({ ok: true, id: message.id });
});

export default router;
