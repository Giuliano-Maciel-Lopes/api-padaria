import { Router } from "express";

import { ProductsController } from "@/controllers/products-controller.js";
import { verifyUserAuthorization } from "@/middleware/verifyuserauth.js";
import { Role } from "@/types/enum..js";
import { ensureAuth } from "@/middleware/ensureauth.js";




const productsRouter = Router();

const productsController = new ProductsController();

// sem token 
productsRouter.get("/", productsController.index);
productsRouter.get("/:id" , productsController.showById)

productsRouter.use(ensureAuth) // com token 

productsRouter.post(
  "/",
  verifyUserAuthorization([Role.ADMIN , Role.STOCK]),
  productsController.create
);

productsRouter.delete("/:id", verifyUserAuthorization([Role.ADMIN , Role.STOCK]), productsController.remove);

productsRouter.patch("/:id", verifyUserAuthorization([Role.ADMIN , Role.STOCK]), productsController.update);

productsRouter.get("/search",  productsController.show);


export { productsRouter };
