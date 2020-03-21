import express from "express";
import moment from "moment";
import { services } from "./services";
import "./models";

const app = express();

app.get("/how-are-you", async (req, res) => {
    const numbers = await services.message.sendHowAreYouAll();

    res.send(`OK (${moment().toISOString()}): ${JSON.stringify(numbers)}\n`);
});

app.listen(3500);
