import { OrdersController } from "@/controllers/orders-controller.js";
import { verifyUserAuthorization } from "@/middleware/verifyuserauth.js";
import { Role } from "@/types/enum..js";
import { Router } from "express";
verifyUserAuthorization
Role

const ordersRoutes = Router()

const ordersController= new OrdersController


ordersRoutes.post("/" , ordersController.create)
ordersRoutes.patch("/:id/status" , verifyUserAuthorization([Role.DELIVERED , Role.STOCK , Role.ADMIN]), ordersController.updateStatus)
ordersRoutes.get("/" , ordersController.index)
//ordersRoutes.patch("/:id/amount" , ordersController.updateAmount)


export {ordersRoutes}