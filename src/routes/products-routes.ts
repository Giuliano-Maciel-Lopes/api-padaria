import { Router } from "express";

import { ProductsController } from "@/controllers/products-controller.js";
import { verifyUserAuthorization } from "@/middleware/verifyuserauth.js";
import { Role } from "@/types/enum..js";




const productsRouter = Router();

const productsController = new ProductsController();

productsRouter.get("/", productsController.index);

productsRouter.post(
  "/",
  verifyUserAuthorization([Role.ADMIN , Role.STOCK]),
  productsController.create
);

productsRouter.delete("/:id", verifyUserAuthorization([Role.ADMIN , Role.STOCK]), productsController.remove);

productsRouter.patch("/:id", verifyUserAuthorization([Role.ADMIN , Role.STOCK]), productsController.update);

productsRouter.get("/search",  productsController.show);

export { productsRouter };
