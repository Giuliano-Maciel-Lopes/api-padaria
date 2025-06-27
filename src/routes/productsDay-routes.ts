import { ProductDaysController } from "@/controllers/productsDay.controller.js";
import { verifyUserAuthorization } from "@/middleware/verifyuserauth.js";
import { Role } from "@/types/enum..js";
import { Router } from "express";

const productsDayRoutes = Router()

const productDaysController = new ProductDaysController


productsDayRoutes.post("/",verifyUserAuthorization([Role.ADMIN ,Role.STOCK ]) , productDaysController.create);
productsDayRoutes.get("/", productDaysController.index);

export{productsDayRoutes}