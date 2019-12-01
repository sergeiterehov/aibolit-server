import { Router } from "express";
import moment from "moment";
import { HealthHartRate } from "../models/HealthHartRate";

const router = Router();

interface IRawSave {
    hr: IRawHartRate[];
}

interface IRawHartRate {
    date: string;
    device: string;
    avgVal: number;
}

async function saveHartRate(items: IRawHartRate[]) {
    await HealthHartRate.bulkCreate(items.map((item) => {
        return {
            date: moment(item.date).toDate(),
            avgVal: item.avgVal,
            device: item.device,
        };
    }));
}

router.post("/save", async (req, res) => {
    const data: IRawSave = req.body;

    await saveHartRate(data.hr);

    res.send({
        ok: true,
    });
});

router.get("/save", async (req, res) => {
    const hr = await HealthHartRate.findAll();

    res.send({
        hr,
    });
});

module.exports = router;