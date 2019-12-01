import { Router } from "express";
import moment from "moment";
import { HealthHartRate } from "../models/HealthHartRate";
import { HealthStep } from "../models/HealthStep";
import { HealthWeight } from "../models/HealthWeight";
import { HealthHeight } from "../models/HealthHeight";
import { HealthMassIndex } from "../models/HealthMassIndex";
import { HealthMood } from "../models/HealthMood";

const router = Router();

interface IRawPeriod {
    from: string;
    to: string;
}

interface IRawMeasurable {
    val: number;
}

interface IRawCommon {
    device: string;
}

interface IRawSimpleMeasure extends IRawCommon, IRawMeasurable {
    date: string;
}

interface IRawHartRate extends IRawCommon {
    date: string;
    avgVal: number;
}

interface IRawStep extends IRawCommon, IRawMeasurable {
    period: IRawPeriod;
}

interface IRawHeight extends IRawSimpleMeasure {
    //
}

interface IRawWeight extends IRawSimpleMeasure {
    //
}

interface IRawMassIndex extends IRawSimpleMeasure {
    //
}

interface IRawMood extends IRawCommon {
    date: string;
    smile: number;
}

interface IRequestSave {
    hr: IRawHartRate[];
    step: IRawStep[];
    weight: IRawWeight[];
    height: IRawHeight[];
    massIndex: IRawMassIndex[];
    mood: IRawMood[];
}

async function saveHartRate(items: IRawHartRate[]) {
    await HealthHartRate.bulkCreate(items.map((item) => {
        return {
            userId: 1,
            device: item.device,
            date: moment(item.date).toDate(),
            avgVal: item.avgVal,
        };
    })).catch(async (e) => { throw new Error("Ошибка в HartRate"); });
}

async function saveSteps(items: IRawStep[]) {
    await HealthStep.bulkCreate(items.map((item) => {
        return {
            userId: 1,
            device: item.device,
            periodFrom: moment(item.period.from).toDate(),
            periodTo: moment(item.period.to).toDate(),
            val: item.val,
        };
    })).catch(async (e) => { throw new Error("Ошибка в Step"); });
}

async function saveWeight(items: IRawWeight[]) {
    await HealthWeight.bulkCreate(items.map((item) => {
        return {
            userId: 1,
            device: item.device,
            date: moment(item.date).toDate(),
            val: item.val,
        };
    })).catch(async (e) => { throw new Error("Ошибка в Weight"); });
}

async function saveHeight(items: IRawHeight[]) {
    await HealthHeight.bulkCreate(items.map((item) => {
        return {
            userId: 1,
            device: item.device,
            date: moment(item.date).toDate(),
            val: item.val,
        };
    })).catch(async (e) => { throw new Error("Ошибка в Height"); });
}

async function saveMassIndex(items: IRawMassIndex[]) {
    await HealthMassIndex.bulkCreate(items.map((item) => {
        return {
            userId: 1,
            device: item.device,
            date: moment(item.date).toDate(),
            val: item.val,
        };
    })).catch(async (e) => { throw new Error("Ошибка в MassIndex"); });
}

async function saveMood(items: IRawMood[]) {
    await HealthMood.bulkCreate(items.map((item) => {
        return {
            userId: 1,
            device: item.device,
            date: moment(item.date).toDate(),
            smile: item.smile,
        };
    })).catch(async (e) => { throw new Error("Ошибка в Mood"); });
}

router.post("/save", async (req, res) => {
    const data: IRequestSave = req.body;

    try {
        await saveHartRate(data.hr);
        await saveSteps(data.step);
        await saveWeight(data.weight);
        await saveHeight(data.height);
        await saveMassIndex(data.massIndex);
        await saveMood(data.mood);
    } catch (e) {
        console.error(e);

        return res.status(500).send({
            error: e ? e.message : "unknown"
        });
    }

    res.send({
        ok: true,
    });
});

router.get("/save", async (req, res) => {
    const hr = await HealthHartRate.findAll();
    const step = await HealthStep.findAll();
    const weight = await HealthWeight.findAll();
    const height = await HealthHeight.findAll();
    const massIndex = await HealthMassIndex.findAll();
    const mood = await HealthMood.findAll();

    res.send({
        hr,
        step,
        weight,
        height,
        massIndex,
        mood,
    });
});

module.exports = router;