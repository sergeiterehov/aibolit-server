import { createServer } from "http";
import express from "express";
import bodyParser from "body-parser";
import "./models";

import indexRouter from "./controllers";
import { registerWebSocket } from "./socket";

const app = express();

app.use(bodyParser.json({limit: "10mb"}));

app.use("/", indexRouter);

const server = createServer(app);

registerWebSocket(server);

server.listen(3000);
