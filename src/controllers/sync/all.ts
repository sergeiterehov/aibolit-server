import { Router, RequestHandler } from "express";
import moment from "moment";
import { withErrorHandler } from "../../middlewares/withErrorHandler";
import { HealthStep } from "../../models/HealthStep";
import { telemedDB } from "../../databases/telemed";
import { HealthHartRate } from "../../models/HealthHartRate";
import { HealthWeight } from "../../models/HealthWeight";
import { HealthHeight } from "../../models/HealthHeight";
import { HealthMassIndex } from "../../models/HealthMassIndex";
import { HealthMood } from "../../models/HealthMood";

function csvValue(raw: any): string {
    if (raw instanceof Date) {
        return String(moment(raw).unix());
    }

    switch (typeof raw) {
        case "number":
        case "boolean":
        case "undefined":
            return String(raw);
        default:
            return `"${String(raw).replace('"', '\\"')}"`;
    }
}

function dataSelector(tableName, fields: string[]): RequestHandler {
    return async function(req, res) {
        res.setHeader("Content-Type", "application/csv; charset=utf-8");

        res.write(fields.join(",") + "\n", "UTF-8");

        let offset = 0;

        while (true) {
            const [
                items,
            ]: any = await telemedDB.query(
                `select ${fields.join(",")} from ${tableName} limit ${offset}, 100000`,
                { raw: true },
            );

            if (!items.length) {
                break;
            }

            console.log(items);

            offset += items.length;

            res.write(
                items
                    .map(item =>
                        fields
                            .map(field => item[field])
                            .map(csvValue)
                            .join(","),
                    )
                    .join("\n") + "\n",
                "UTF-8",
            );
        }

        res.end();
    };
}

const router = Router();

router.get(
    "/steps",
    withErrorHandler(
        dataSelector(HealthStep.tableName, [
            "userId",
            "device",
            "periodFrom",
            "periodTo",
            "val",
        ]),
    ),
);

router.get(
    "/hart-rate",
    withErrorHandler(
        dataSelector(HealthHartRate.tableName, [
            "userId",
            "device",
            "date",
            "avgVal",
        ]),
    ),
);

router.get(
    "/weight",
    withErrorHandler(
        dataSelector(HealthWeight.tableName, [
            "userId",
            "device",
            "date",
            "val",
        ]),
    ),
);

router.get(
    "/height",
    withErrorHandler(
        dataSelector(HealthHeight.tableName, [
            "userId",
            "device",
            "date",
            "val",
        ]),
    ),
);

router.get(
    "/mass-index",
    withErrorHandler(
        dataSelector(HealthMassIndex.tableName, [
            "userId",
            "device",
            "date",
            "val",
        ]),
    ),
);

router.get(
    "/mood",
    withErrorHandler(
        dataSelector(HealthMood.tableName, [
            "userId",
            "date",
            "smile",
        ]),
    ),
);

export default router;
