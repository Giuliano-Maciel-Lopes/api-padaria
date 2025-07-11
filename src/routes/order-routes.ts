import { OrdersController } from "@/controllers/orders-controller.js";
import { verifyUserAuthorization } from "@/middleware/verifyuserauth.js";
import { Role } from "@/types/enum..js";
import { Router } from "express";
verifyUserAuthorization;
Role;

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.post("/", ordersController.create);
ordersRoutes.patch(
  "/:idOrders/status",
  verifyUserAuthorization([Role.DELIVERED, Role.STOCK, Role.ADMIN]),
  ordersController.updateStatus
);
ordersRoutes.get("/", ordersController.index);
ordersRoutes.get("/:id", ordersController.show)


export { ordersRoutes };
