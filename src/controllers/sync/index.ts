import { Router } from "express";
import allRouter from "./all";

const router = Router();

router.use("/all", allRouter);

export default router;
