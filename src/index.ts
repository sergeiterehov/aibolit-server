import express from "express";
import bodyParser from "body-parser";

import indexRouter from "./controllers";

const app = express();

app.use(bodyParser.json({limit: "10mb"}));

app.use("/", indexRouter);


app.listen(3000);

export default express;
