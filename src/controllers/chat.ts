import { Router } from "express";
import { isString } from "util";
import axios from "axios";
import { withUserAutentication } from "../middlewares/withUserAutentication";
import { Message } from "../models/Message";
import { Op } from "sequelize";
import { User } from "../models/User";
import { AttachmentType } from "../enums/AttachmentType";
import { MessageAttachment } from "../models/MessageAttachment";
import { HealthMood } from "../models/HealthMood";
import { withErrorHandler, RequestHttpError, ExistsHttpError } from "../middlewares/withErrorHandler";
import { withSchema } from "../middlewares/withSchema";
import { SystemUser } from "../enums/SystemUser";

const router = Router().use(withUserAutentication);

async function createMoodFromResource(resource: any, userId: number) {
    if (!resource) {
        throw new Error("RESOURCE_IS_REQUIRED");
    }

    if (!resource.smile) {
        throw new Error("SMILE_IS_REQUIRED");
    }

    const mood = new HealthMood();

    mood.device = "",
    mood.date = new Date();
    mood.userId = userId;
    mood.smile = resource.smile;

    await mood.save();

    return mood;
}

async function nlpProcess(text: string, userId: number) {
    const nlpResponse = await axios.post("http://localhost:3501/process", {
        context: `user/${userId}`,
        input: text,
    }, {
        timeout: 10000,
    });

    if (nlpResponse.status !== 200) {
        return;
    }

    const nlpResponseData = nlpResponse.data;

    const nlpMessage = new Message();

    nlpMessage.fromUserId = SystemUser.System;
    nlpMessage.toUserId = userId;
    nlpMessage.text = nlpResponseData.output;

    await nlpMessage.save();
}

router.post("/with", withSchema({
    type: "object",
    properties: {
        userId: {
            type: "integer",
        },
    },
    required: ["userId"],
}), withErrorHandler(async (req, res) => {
    const withUserId = req.body.userId;

    const withUser = await User.findOne({where: { id: withUserId }});

    if (!withUser) {
        throw new RequestHttpError("USER_NOT_FOUND");
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
    }, include: [MessageAttachment], order: [["id", "DESC"]], limit: 100 });

    messages.sort((a, b) => a.createdAt > b.createdAt ? 1 : a.createdAt < b.createdAt ? -1 : 0);

    /**
     * TODO:
     * Можно пройти по всем сообщениям и собрать ID настроений,
     * почле чего запросить настроения с этими ID и врожить их в
     * {resources: {mood: []}}
     */

    res.send({
        users: [ user, withUser ],
        yourId: user.id,
        messages,
    });
}));

router.post("/send", withSchema({
    type: "object",
    properties: {
        userId: {
            type: "integer",
        },
        text: {
            type: "string",
        },
        attachments: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    type: {
                        type: "string",
                        enum: Object.values(AttachmentType).filter(isString),
                    },
                    resourceId: {
                        type: "integer",
                    },
                    resource: {
                        type: "any",
                    },
                },
                required: ["type"],
            },
        },
    },
    required: ["userId", "text", "attachments"],
}), withErrorHandler(async (req, res) => {
    const { userId, text, attachments } = req.body;

    const toUser = await User.findOne({where: { id: userId }});

    if (!toUser) {
        throw new ExistsHttpError("USER_NOT_FOUND");
    }

    const fromUser = req.user;

    const message = new Message();

    message.fromUserId = fromUser.id;
    message.toUserId = toUser.id;
    message.text = text;

    await message.save();

    const warns: string[] = [];

    for (const attachmentItem of attachments) {
        try {
            const attachment = new MessageAttachment();

            attachment.messageId = message.id;
            // TODO: fix this shit
            attachment.type = AttachmentType[attachmentItem.type as string];
            attachment.resourceId = attachmentItem.resourceId;

            if (attachment.type === AttachmentType.Mood) {
                const mood = await createMoodFromResource(attachmentItem.resource, fromUser.id);

                attachment.resourceId = mood.id;
                attachment.resource = mood.smile;
            }

            await attachment.save();
        } catch (e) {
            warns.push((e && e.message) || "UNKNOWN_ERROR");
        }
    }

    if (text && toUser.id === SystemUser.System) {
        // Асинхронная операция.
        nlpProcess(text, fromUser.id)
            .catch((e) => console.error("[NLP ERROR]", e instanceof Error ? e.message : e));
    }

    res.send({
        ok: true,
        id: message.id,
        warns: warns.length ? warns : undefined,
    });
}));

export default router;
