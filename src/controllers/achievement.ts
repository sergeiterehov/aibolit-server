import moment from "moment";
import { Router } from "express";
import { withUserAutentication } from "../middlewares/withUserAutentication";
import { withSchema } from "../middlewares/withSchema";
import { Achievement } from "../models/Achievement";
import { UserAchievement } from "../models/UserAchievement";
import { ServerHttpError } from "../middlewares/withErrorHandler";

const router = Router().use(withUserAutentication);

router.get("/my", async (req, res) => {
    const achievements = await UserAchievement.findAll({
        where: { userId: req.user.id },
        include: [Achievement],
    });

    res.send(achievements.map((item) => {
        if (!item.Achievement) {
            throw new ServerHttpError(`Achievement required`);
        }

        return {
            key: item.Achievement.key,
            doneAt: item.doneAt,
        };
    }));
});

router.post(
    "/save",
    withSchema({
        type: "array",
        items: {
            type: "object",
            properties: {
                key: {
                    type: "string",
                },
                doneAt: {
                    type: "string",
                },
            },
            required: ["key"],
        },
    }),
    async (req, res) => {
        const items: any[] = req.body;

        const achievements = await Achievement.findAll({ where: {} });

        await Promise.all(items.map(async (item) => {
            const achievement = achievements.find((achievement) => achievement.key === item.key);

            if (!achievement) {
                return;
            }

            const link = new UserAchievement();

            link.userId = req.user.id;
            link.achievementId = achievement.id;
            link.doneAt = item.doneAt ? moment(item.doneAt).toDate() : undefined;

            await UserAchievement.bulkCreate([link.get()], { updateOnDuplicate: ["doneAt"] });
        }));

        res.send({ ok: true });
    },
);

export default router;
