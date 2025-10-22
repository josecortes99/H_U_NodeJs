import { Router } from "express";
import { loginController } from "../controllers/login.controller.ts";
import { refreshTokenController } from "../controllers/refresh.controller.ts";

const router: Router = Router();

router.post("/", loginController);
router.post("/refresh-token", refreshTokenController);

export { router };
