import { Router } from "express";
import { HealthHartRate } from "../models/HealthHartRate";
import { HealthStep } from "../models/HealthStep";
import { HealthWeight } from "../models/HealthWeight";
import { HealthHeight } from "../models/HealthHeight";
import { HealthMassIndex } from "../models/HealthMassIndex";
import { HealthMood } from "../models/HealthMood";
import { withErrorHandler } from "../middlewares/withErrorHandler";

const router = Router();

router.get("/all", withErrorHandler(async (req, res) => {
    const hr = await HealthHartRate.findAll();
    const step = await HealthStep.findAll();
    const weight = await HealthWeight.findAll();
    const height = await HealthHeight.findAll();
    const massIndex = await HealthMassIndex.findAll();
    const mood = await HealthMood.findAll();

    res.send({
        ok: true,
        objects: {
            hr,
            step,
            weight,
            height,
            massIndex,
            mood,
        },
    });
}));

export default router;

