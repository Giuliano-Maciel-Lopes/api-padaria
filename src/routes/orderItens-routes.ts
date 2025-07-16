
import { OrdersItensController } from "@/controllers/ordersItens-controller.js";
import { Router } from "express";

const ordersItensRoutes = Router()

const ordersItensController= new OrdersItensController


ordersItensRoutes.post("/:orderId" , ordersItensController.create)
ordersItensRoutes.patch("/items/:id" , ordersItensController.updateQuantity)
ordersItensRoutes.delete("/items/:id" , ordersItensController.remove)
ordersItensRoutes.get("/:orderId" , ordersItensController.index)

export {ordersItensRoutes}