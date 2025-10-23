import { Router } from "express";
import { getStoresController, getStoreByIdController, createStoreController, updateStoreController, deleteStoreController, getActiveStoresController } from "../controllers/stores.controller.ts";
import { authMiddleware, authorizeRoles } from "../middlewares/validateJwt.middleware.ts";
//import { validateDto } from "../middlewares/validateDto.middleware.ts";
//import { StoresDTO } from "../dtos/stores.dto.ts";

const router: Router = Router()

router.get("/", authMiddleware, authorizeRoles(["admin", "vendedor"]),  getStoresController);
router.get("/active", authMiddleware, authorizeRoles(["admin","vendedor"]),  getActiveStoresController);
router.get("/:id", authMiddleware, authorizeRoles(["admin", "vendedor"]),  getStoreByIdController);
router.post("/", authMiddleware, authorizeRoles(["admin"]), /*validateDto(StoresDTO),*/  createStoreController);
router.put("/:id", authMiddleware, authorizeRoles(["admin"]), /*validateDto(StoresDTO),*/  updateStoreController);
router.delete("/:id", authMiddleware, authorizeRoles(["admin"]),  deleteStoreController);

export { router };
