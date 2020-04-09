import express from "express";
import moment from "moment";
import { QueryTypes } from "sequelize";
import "./models";
import { services } from "./services";
import { User } from "./models/User";

const app = express();

app.get("/send-today-stats", async (req, res) => {
    const { sequelize } = User;

    if (!sequelize) {
        return res.send("Sequelize not found");
    }

    const subscribers = await sequelize.query<{
        id: number;
        userId: number;
    }>(`
    select max(id) as id, i.userId
    from indicators i
    where i.\`key\` = 'SubscribeCovid19' and i.value = '1' and i.userId is not null
    group by i.userId
    `, { type: QueryTypes.SELECT });

    Promise.all(subscribers.map(async ({ userId }) => {
        await services.nlp.process("какая статистика на сегодня по коронавирусу", userId);
    }));

    res.send(`OK (${moment().toISOString()}): ${JSON.stringify(subscribers.length)}\n`);
});

app.listen(3502);
