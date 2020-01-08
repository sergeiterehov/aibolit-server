import { Router } from "express";
import { withErrorHandler } from "../../middlewares/withErrorHandler";
import { HealthStep } from "../../models/HealthStep";

const router = Router();

router.get("/steps", withErrorHandler(async (req, res) => {
    res.setHeader("Content-Type", "application/csv; charset=utf-8");

    let offset = 0;

    while (true) {
        const steps = await HealthStep.findAll({
            where: {},
            limit: 10000,
            offset,
        });

        if (!steps.length) {
            break;
        }

        offset += steps.length;

        res.write(steps.map((item) => [
            ...Object.values(item.get())
        ].join(",")), "UTF-8");
    }

    res.end();
}));

export default router;
