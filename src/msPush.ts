import express from "express";
import moment from "moment";
import { services } from "./services";
import "./models";

const app = express();

app.get("/how-are-you", async (req, res) => {
    const number = await services.push.sendHowAreYouAll();

    res.send(`OK (${moment().toISOString()}): ${number}\n`);
});

app.listen(3500);
