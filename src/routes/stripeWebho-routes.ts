import { Router } from "express";
import express from "express";
import { StripeWebhookController } from "@/controllers/stripeWebho-controller.js";

const stripeWebhookRoutes = Router();
const stripeWebhookController = new StripeWebhookController();

stripeWebhookRoutes.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhookController.webhook
);

export { stripeWebhookRoutes };
