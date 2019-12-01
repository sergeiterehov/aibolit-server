import { Router } from "express";
import { HealthHartRate } from "../models/HealthHartRate";

const router = Router();

router.post("/save", (req, res) => {
    res.send({
        ok: true,
    });
});

router.get("/save", async (req, res) => {
    const hr = new HealthHartRate();
    hr.avgVal = 123;
    hr.date = new Date();
    hr.device = "test";

    await hr.save();

    const list = await HealthHartRate.findAll();

    res.send(list);
});

module.exports = router;