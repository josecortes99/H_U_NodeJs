import { Router } from "express";
import { createUserController } from "../controllers/register.controller.ts";

const router: Router = Router();

router.post("/", createUserController);

export { router };
