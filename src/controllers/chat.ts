import { Router } from "express";
import { isString } from "util";
import { withUserAutentication } from "../middlewares/withUserAutentication";
import { Message } from "../models/Message";
import { Op } from "sequelize";
import { User } from "../models/User";
import { AttachmentType } from "../enums/AttachmentType";
import { MessageAttachment } from "../models/MessageAttachment";
import { HealthMood } from "../models/HealthMood";
import { withErrorHandler, RequestHttpError, ExistsHttpError } from "../middlewares/withErrorHandler";
import { withSchema } from "../middlewares/withSchema";
import { services } from "../services";

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

    messages.sort((a, b) => (Number(a.createdAt) - Number(b.createdAt)) || (a.id - b.id));

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

    const attachmentsModels = await Promise.all(Array(...attachments).map(async (attachmentItem) => {
        const attachment = new MessageAttachment();

        // TODO: fix this shit
        attachment.type = AttachmentType[attachmentItem.type as string];
        attachment.resourceId = attachmentItem.resourceId;

        if (attachment.type === AttachmentType.Mood) {
            const mood = await createMoodFromResource(attachmentItem.resource, fromUser.id);

            attachment.resourceId = mood.id;
            attachment.resource = mood.smile;
        }

        return attachment;
    }));

    const message = await services.message.send(fromUser.id, toUser.id, text, attachmentsModels);

    res.send({
        ok: true,
        id: message.id,
    });
}));

export default router;
