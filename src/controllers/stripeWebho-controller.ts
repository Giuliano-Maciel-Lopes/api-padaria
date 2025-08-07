import { Request, Response } from "express";
import Stripe from "stripe";
import { prisma } from "@/database/prisma.js";
import { env } from "@/utils/env.js";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil",
});

class StripeWebhookController {
  async webhook(req: Request, res: Response): Promise<void> {
    const sig = req.headers["stripe-signature"] as string;
    console.log("Webhook recebido!");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        env.STRIPE_WEBHOOK_SECRET_KEY
      );
    } catch (err) {
      console.error("webbhook falhou:", err);
      res.status(400).json(`Webhook Error: ${err}`);
      return;
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        await prisma.order.update({
          where: { id: orderId },
          data: { status: "ITENS_PROCESSING" },
        });
      }
    }

    res.status(200).json({ received: true });
  }
}

export { StripeWebhookController };
