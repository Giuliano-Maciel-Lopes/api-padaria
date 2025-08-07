import { Router } from "express";

import { ProductsController } from "@/controllers/products-controller.js";
import { verifyUserAuthorization } from "@/middleware/verifyuserauth.js";
import { Role } from "@/types/enum.js";
import { ensureAuth } from "@/middleware/ensureauth.js";
import { optionalAuth } from "@/middleware/esureoptionalauth.js";




const productsRouter = Router();

const productsController = new ProductsController();

// sem token 
productsRouter.get("/", optionalAuth , productsController.index);
productsRouter.get("/:id" , optionalAuth ,  productsController.showById)

productsRouter.use(ensureAuth) // com token 


productsRouter.post(
  "/",
  verifyUserAuthorization(["ADMIN" , "STOCK"]),
  productsController.create
);

productsRouter.delete("/:id", verifyUserAuthorization(["ADMIN" , "STOCK"]), productsController.remove);

productsRouter.patch("/:id", verifyUserAuthorization(["ADMIN" , "STOCK"]), productsController.update);
productsRouter.patch("/active/:id", verifyUserAuthorization(["ADMIN" , "STOCK"]), productsController.updateActive);




export { productsRouter };
