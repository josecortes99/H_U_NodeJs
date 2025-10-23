import { Router } from "express";
import { getOrdersController, getOrderByIdController, createOrderController, updateOrderController, deleteOrderController, getOrdersByCustomerController, getOrdersByProductController } from "../controllers/orders.controller.ts";
import { authMiddleware, authorizeRoles } from "../middlewares/validateJwt.middleware.ts";
//import { validateDto } from "../middlewares/validateDto.middleware.ts";
//import { OrdersDTO } from "../dtos/orders.dto.ts";

const router: Router = Router()

router.get("/", authMiddleware, authorizeRoles(["admin", "vendedor"]), getOrdersController);
router.get("/by-customer", authMiddleware, authorizeRoles(["admin", "vendedor"]), getOrdersByCustomerController);
router.get("/by-product", authMiddleware, authorizeRoles(["admin", "vendedor"]), getOrdersByProductController);
router.get("/:id", authMiddleware, authorizeRoles(["admin", "vendedor"]), getOrderByIdController);
router.post("/", authMiddleware, authorizeRoles(["admin"]), /*validateDto(OrdersDTO),*/ createOrderController);
router.put("/:id", authMiddleware, authorizeRoles(["admin"]), /*validateDto(OrdersDTO),*/ updateOrderController);
router.delete("/:id", authMiddleware, authorizeRoles(["admin"]), deleteOrderController);

export { router };
