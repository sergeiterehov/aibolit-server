import { Router } from "express";
import moment from "moment";
import { HealthHartRate } from "../models/HealthHartRate";
import { HealthStep } from "../models/HealthStep";
import { HealthWeight } from "../models/HealthWeight";
import { HealthHeight } from "../models/HealthHeight";
import { HealthMassIndex } from "../models/HealthMassIndex";
import { HealthMood } from "../models/HealthMood";
import { User } from "../models/User";
import { withUserAutentication } from "../middlewares/withUserAutentication";
import { Message } from "../models/Message";
import { SystemUser } from "../enums/SystemUser";
import { MessageAttachment } from "../models/MessageAttachment";
import { AttachmentType } from "../enums/AttachmentType";

const router = Router().use(withUserAutentication);

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
    email: string;
    hr: IRawHartRate[];
    step: IRawStep[];
    weight: IRawWeight[];
    height: IRawHeight[];
    massIndex: IRawMassIndex[];
    mood: IRawMood[];
}

async function saveHartRate(userId: number, items: IRawHartRate[]) {
    await HealthHartRate.bulkCreate(items.map((item) => {
        return {
            userId,
            device: item.device,
            date: moment(item.date).toDate(),
            avgVal: item.avgVal,
        };
    }), {updateOnDuplicate: ["avgVal"]});
}

async function saveSteps(userId: number, items: IRawStep[]) {
    await HealthStep.bulkCreate(items.map((item) => {
        return {
            userId,
            device: item.device,
            periodFrom: moment(item.period.from).toDate(),
            periodTo: moment(item.period.to).toDate(),
            val: item.val,
        };
    }), {updateOnDuplicate: ["val"]});
}

async function saveWeight(userId: number, items: IRawWeight[]) {
    await HealthWeight.bulkCreate(items.map((item) => {
        return {
            userId,
            device: item.device,
            date: moment(item.date).toDate(),
            val: item.val,
        };
    }), {updateOnDuplicate: ["val"]});
}

async function saveHeight(userId: number, items: IRawHeight[]) {
    await HealthHeight.bulkCreate(items.map((item) => {
        return {
            userId,
            device: item.device,
            date: moment(item.date).toDate(),
            val: item.val,
        };
    }), {updateOnDuplicate: ["val"]});
}

async function saveMassIndex(userId: number, items: IRawMassIndex[]) {
    await HealthMassIndex.bulkCreate(items.map((item) => {
        return {
            userId,
            device: item.device,
            date: moment(item.date).toDate(),
            val: item.val,
        };
    }), {updateOnDuplicate: ["val"]});
}

/**
 * @deprecated
 */
async function saveMood(userId: number, items: IRawMood[]) {
    const moods = await HealthMood.bulkCreate(items.map((item) => {
        return {
            userId,
            device: item.device || "",
            date: moment(item.date).toDate(),
            smile: item.smile,
        };
    }), {updateOnDuplicate: ["smile"]});

    await Promise.all(moods.map(async (mood) => {
        const message = new Message();

        message.fromUserId = userId;
        message.toUserId = SystemUser.System;

        await message.save();

        const attachment = new MessageAttachment();

        attachment.messageId = message.id;
        attachment.type = AttachmentType.Mood;
        attachment.resourceId = mood.id;
        attachment.resource = mood.smile;

        await attachment.save();
    }));
}

declare global {
    namespace Express {
        export interface Request {
           user: User;
        }
    }
}

router.post("/save", async (req, res) => {
    const data: IRequestSave = req.body;
    const id = req.user.id;

    try {
        await saveHartRate(id, data.hr).catch(async (e) => { throw new Error("Ошибка в HartRate"); });
        await saveSteps(id, data.step).catch(async (e) => { throw new Error("Ошибка в Step"); });
        await saveWeight(id, data.weight).catch(async (e) => { throw new Error("Ошибка в Weight"); });
        await saveHeight(id, data.height).catch(async (e) => { throw new Error("Ошибка в Height"); });
        await saveMassIndex(id, data.massIndex).catch(async (e) => { throw new Error("Ошибка в MassIndex"); });
        // TODO: depricated
        await saveMood(id, data.mood).catch(async (e) => { throw new Error("Ошибка в Mood"); });
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

router.post("/all", async (req, res) => {
    const userId = req.user.id;

    const hr = await HealthHartRate.findAll({where: {userId}});
    const step = await HealthStep.findAll({where: {userId}});
    const weight = await HealthWeight.findAll({where: {userId}});
    const height = await HealthHeight.findAll({where: {userId}});
    const massIndex = await HealthMassIndex.findAll({where: {userId}});
    const mood = await HealthMood.findAll({where: {userId}});

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
});

router.post("/clear", async (req, res) => {
    const userId = req.user.id;

    const hr = await HealthHartRate.destroy({where: {userId}});
    const step = await HealthStep.destroy({where: {userId}});
    const weight = await HealthWeight.destroy({where: {userId}});
    const height = await HealthHeight.destroy({where: {userId}});
    const massIndex = await HealthMassIndex.destroy({where: {userId}});
    const mood = await HealthMood.destroy({where: {userId}});

    res.send({
        ok: true,
        deleted: {
            hr,
            step,
            weight,
            height,
            massIndex,
            mood,
        },
    });
});

export default router;