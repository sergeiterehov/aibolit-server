const express = require("express");
const healthRouter = require("./health");

const router = express.Router();

router.get("/", (req, res) => res.send("Hello, world!"));

router.use("/health", healthRouter);

module.exports = router;
