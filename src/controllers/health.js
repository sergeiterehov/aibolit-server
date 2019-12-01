const express = require("express");

const router = express.Router();

router.post("/save", (req, res) => {
    res.send({
        ok: true,
    });
});

module.exports = router;