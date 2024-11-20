import { Router } from "express";
import { ValidationMiddleware } from "../middleware/validation";
import { humanizeController } from "../controllers/humanizeController";

const router = Router();

router.post("/humanize", ValidationMiddleware, humanizeController);

export { router as humanizeRouter };
