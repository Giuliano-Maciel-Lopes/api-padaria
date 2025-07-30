import { Router } from "express";
import { StripeController } from "@/controllers/stripe-controller.js";

const stripeRoutes =Router()

const stripeController = new StripeController

stripeRoutes.post("/create-checkout-session", stripeController.create)

export{stripeRoutes}