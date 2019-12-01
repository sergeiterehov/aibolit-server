import { Router } from "express";
import healthRouter from "./health";
import syncRouter from "./health";

const router = Router();

router.get("/", (req, res) => res.send("Hello, world!"));

router.use("/health", healthRouter);
router.use("/sync", syncRouter);

export default router;
