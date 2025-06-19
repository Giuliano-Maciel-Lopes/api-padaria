
import { OrdersItensController } from "@/controllers/ordersItens-controller.js";
import { Router } from "express";

const ordersItensRoutes = Router()

const ordersItensController= new OrdersItensController


ordersItensRoutes.post("/:orderid" , ordersItensController.create)

export {ordersItensRoutes}