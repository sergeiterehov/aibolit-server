import { Router } from "express";

const router = Router();

router.get("/all", async (req, res) => {
    res.send({
        hr: [],
    });
});

export default router;

