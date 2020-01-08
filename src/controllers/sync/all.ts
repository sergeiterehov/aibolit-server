import { Router } from "express";
import { withErrorHandler } from "../../middlewares/withErrorHandler";
import { HealthStep } from "../../models/HealthStep";
import moment from "moment";

function csvValue(raw: any): string {
    switch (typeof raw) {
        case "number":
        case "boolean":
        case "undefined":
            return String(raw);
        default:
            return `"${String(raw).replace('"', '\\"')}"`;
    }
}

const router = Router();

router.get("/steps", withErrorHandler(async (req, res) => {
    res.setHeader("Content-Type", "application/csv; charset=utf-8");

    res.write([
        "userId",
        "device",
        "periodFrom",
        "periodTo",
        "value",
    ].join(",") + "\n", "UTF-8");

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
            item.userId,
            item.device,
            moment(item.periodFrom).toISOString(),
            moment(item.periodTo).toISOString(),
            item.val,
        ].map(csvValue).join(",")).join("\n") + "\n", "UTF-8");
    }

    res.end();
}));

export default router;
