import { Request, Response } from "express";
import Stripe from "stripe";
import { prisma } from "@/database/prisma.js";
import { env } from "@/utils/env.js";
import { updateProductStatusOrders } from "@/services/controller/stripewebhooks/updateproducts.js";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil",
});

class StripeWebhookController {
  async webhook(req: Request, res: Response): Promise<void> {
    const sig = req.headers["stripe-signature"] as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        env.STRIPE_WEBHOOK_SECRET_KEY
      );
    } catch (err) {
      console.error("webhook falhou:", err);
      res.status(400).json(`Webhook Error: ${err}`);
      return;
    }
// configuacoes para receber weebhooks
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;

      if (!orderId) {
        res.status(400).json({ error: "Order ID não encontrado no metadata" });
        return;
      }

      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: { include: { product: true } } },
      });

      if (!order) {
        res.status(404).json({ error: "Pedido não encontrado" });
        return;
      }

      // Verifica estoque
      const hasStock = order.items.every(item => item.product.stock >= item.quantity);

      if (!hasStock) {
        // Só tenta reembolsar se payment_intent existir
        if (session.payment_intent) {
          await stripe.refunds.create({ payment_intent: session.payment_intent as string });
        } else {
          console.warn("payment_intent não encontrado para refund");
        }
        
        // Pedido fica no status PROCESSING (sem alteração)
        res.status(200).json({ message: "Estoque insuficiente, pagamento estornado." });
        return;
      }

      try {
        await updateProductStatusOrders(order);

        res.status(200).json({ received: true });
      } catch (error: any) {
        console.error("Erro ao processar webhook:", error);
        // Responde 200 para evitar retries infinitos, mas informa erro no corpo
        res.status(200).json({ received: false, error: error.message });
      }
    } else {
      // Para outros eventos, apenas confirma recebimento
      res.status(200).json({ received: true });
    }
  }
}


export { StripeWebhookController };
