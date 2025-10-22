import { Router } from "express";
import { loginController } from "../controllers/login.controller.ts";

const router: Router = Router()

router.post("/", loginController);

export { router }
