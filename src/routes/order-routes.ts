import { OrdersController } from "@/controllers/orders-controller.js";
import { Router } from "express";

const ordersRoutes = Router()

const ordersController= new OrdersController


ordersRoutes.post("/" , ordersController.create)
ordersRoutes.patch("/:id/status" , ordersController.updateStatus)
ordersRoutes.get("/" , ordersController.index)
//ordersRoutes.patch("/:id/amount" , ordersController.updateAmount)


export {ordersRoutes}