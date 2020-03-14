import { Router } from "express";
import healthRouter from "./health";
import syncRouter from "./sync";
import pushRouter from "./push";
import chatRouter from "./chat";
import authRouter from "./auth";
import registrationRouter from "./registration";
import achievementRouter from "./achievement";
import profileRouter from "./profile";

const router = Router();

router.get("/", (req, res) => res.send("Hello, world!"));

router.use("/registration", registrationRouter);
router.use("/auth", authRouter);
router.use("/prfile", profileRouter);
router.use("/health", healthRouter);
router.use("/sync", syncRouter);
router.use("/push", pushRouter);
router.use("/chat", chatRouter);
router.use("/achievement", achievementRouter);

export default router;
