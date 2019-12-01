const express = require("express");
const bodyParser = require("body-parser");

const indexRouter = require("./controllers")

const app = express();

app.use(bodyParser.json());

app.use("/", indexRouter);


app.listen(3000);
