import { Router } from "express";
import { getCustomersController, getCustomerByIdController, createCustomerController, updateCustomerController, deleteCustomerController,findCustomerByIdentificationController } from "../controllers/customers.controller.ts";
import { authMiddleware, authorizeRoles } from "../middlewares/validateJwt.middleware.ts";

const router: Router = Router()

router.get("/", authMiddleware, authorizeRoles(["admin", "vendedor"]), getCustomersController);
router.get("/:id", authMiddleware, authorizeRoles(["admin", "vendedor"]), getCustomerByIdController);
router.post("/", authMiddleware, authorizeRoles(["admin"]), createCustomerController);
router.put("/:id", authMiddleware, authorizeRoles(["admin"]), updateCustomerController);
router.delete("/:id", authMiddleware, authorizeRoles(["admin"]), deleteCustomerController);
router.post("/buscar", authMiddleware, authorizeRoles(["admin", "vendedor"]), findCustomerByIdentificationController);


export { router };
