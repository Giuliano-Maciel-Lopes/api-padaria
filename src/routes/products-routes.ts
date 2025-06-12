import { Router } from "express";

import { ProductsController } from "@/controllers/products-controller.js";
import { verifyUserAuthorization } from "@/middleware/verifyuserauth.js";
import { Role } from "@prisma/client";



const productsRouter = Router();

const productsController = new ProductsController();

productsRouter.get("/", productsController.index);

productsRouter.post(
  "/",
  verifyUserAuthorization([Role.ADMIN , Role.STOCK]),
  productsController.create
);

productsRouter.delete("/:id", productsController.remove);

productsRouter.put("/:id", productsController.update);

export { productsRouter };
