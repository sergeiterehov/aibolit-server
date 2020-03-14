import express from "express";
import bodyParser from "body-parser";
import "./models";

import indexRouter from "./controllers";

const app = express();

app.use(bodyParser.json({limit: "10mb"}));

app.use("/", indexRouter);

app.listen(3000);
