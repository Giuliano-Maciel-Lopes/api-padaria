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
  "/status/:id",
  verifyUserAuthorization([Role.DELIVERED, Role.STOCK, Role.ADMIN]),
  ordersController.updateStatus
);
ordersRoutes.patch("/isHome/:id", ordersController.updateIsHome);

ordersRoutes.get("/", ordersController.index);
ordersRoutes.get("/:id", ordersController.show);
ordersRoutes.delete(
  "/:id",
  verifyUserAuthorization([Role.ADMIN, Role.STOCK]),
  ordersController.delete
);

export { ordersRoutes };
