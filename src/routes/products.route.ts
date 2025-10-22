import { Router } from "express";
import { getProductsController, getProductByIdController, createProductController, updateProductController, deleteProductController, getProductByCodeController } from "../controllers/products.controller.ts";
import { authMiddleware, authorizeRoles } from "../middlewares/validateJwt.middleware.ts";

const router: Router = Router()

router.get("/", authMiddleware, authorizeRoles(["admin", "vendedor"]), getProductsController);
router.get("/code/:code", authMiddleware, authorizeRoles(["admin", "vendedor"]), getProductByCodeController);
router.get("/:id", authMiddleware, authorizeRoles(["admin", "vendedor"]), getProductByIdController);
router.post("/", authMiddleware, authorizeRoles(["admin", "vendedor"]), createProductController);
router.put("/:id", authMiddleware, authorizeRoles(["admin", "vendedor"]), updateProductController);
router.delete("/:id", authMiddleware, authorizeRoles(["admin", "vendedor"]), deleteProductController);

export { router };
