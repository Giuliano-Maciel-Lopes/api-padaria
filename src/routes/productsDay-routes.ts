import { ProductDaysController } from "@/controllers/productsDay.controller.js";
import { Router } from "express";

const productsDayRoutes = Router()

const productDaysController = new ProductDaysController


productsDayRoutes.post("/", productDaysController.create);
productsDayRoutes.get("/", productDaysController.index);

export{productsDayRoutes}