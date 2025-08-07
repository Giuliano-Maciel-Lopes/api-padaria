import { OrdersController } from "@/controllers/orders-controller.js";
import { verifyUserAuthorization } from "@/middleware/verifyuserauth.js";

import { Router } from "express";


const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.post("/", ordersController.create);
ordersRoutes.patch(
  "/status/:id",
  verifyUserAuthorization(["DELIVERED", "STOCK", "ADMIN"]),
  ordersController.updateStatus
);
ordersRoutes.patch("/isHome/:id", ordersController.updateIsHome);

ordersRoutes.get("/", ordersController.index);
ordersRoutes.get("/:id", ordersController.show);
ordersRoutes.delete(
  "/:id",
  verifyUserAuthorization(["ADMIN", "STOCK"]),
  ordersController.delete
);

export { ordersRoutes };
