import { Router } from "express";
import { StripeController } from "@/controllers/stripe-controller.js";
import { ensureAuth } from "@/middleware/ensureauth.js";
import express  from "express"

const stripeRoutes = Router();

const stripeController = new StripeController();


stripeRoutes.use(ensureAuth);

stripeRoutes.post("/create-checkout-session", stripeController.create);

export { stripeRoutes };
