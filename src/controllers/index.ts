import { Router } from "express";
import healthRouter from "./health";
import syncRouter from "./sync";
import pushRouter from "./push";

const router = Router();

router.get("/", (req, res) => res.send("Hello, world!"));

router.use("/health", healthRouter);
router.use("/sync", syncRouter);
router.use("/push", pushRouter);

export default router;
