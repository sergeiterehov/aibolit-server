import express from "express";
import { services } from "./services";

const app = express();

app.get("/how-are-you", async (req, res) => {
    const number = await services.push.sendHowAreYouAll();

    res.send(`OK: ${number}\n`);
});

app.listen(3500);
