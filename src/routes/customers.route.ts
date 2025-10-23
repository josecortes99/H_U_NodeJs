import { Router } from "express";
import { getCustomersController, getCustomerByIdController, createCustomerController, updateCustomerController, deleteCustomerController,findCustomerByIdentificationController } from "../controllers/customers.controller.ts";
import { authMiddleware, authorizeRoles } from "../middlewares/validateJwt.middleware.ts";
//import { validateDto } from "../middlewares/validateDto.middleware.ts";
//import { CustomersDTO } from "../dtos/customers.dto.ts";

const router: Router = Router()

router.get("/", authMiddleware, authorizeRoles(["admin", "vendedor"]), getCustomersController);
router.get("/:id", authMiddleware, authorizeRoles(["admin", "vendedor"]), getCustomerByIdController);
router.post("/", authMiddleware, authorizeRoles(["admin"]), /*validateDto(CustomersDTO),*/ createCustomerController);
router.put("/:id", authMiddleware, authorizeRoles(["admin"]), /*validateDto(CustomersDTO),*/ updateCustomerController);
router.delete("/:id", authMiddleware, authorizeRoles(["admin"]), deleteCustomerController);
router.post("/buscar", authMiddleware, authorizeRoles(["admin", "vendedor"]), /*validateDto(CustomersDTO),*/ findCustomerByIdentificationController);

export { router };
