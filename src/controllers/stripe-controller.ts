import { Request, Response } from "express";
import Stripe from "stripe";
import { prisma } from "@/database/prisma.js";
import { env } from "@/utils/env.js";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil",
});

class StripeController {
  async create(req: Request, res: Response): Promise<void> {
    const userId = req.user!.id;
  console.log("Create checkout session called");
    try {
      const order = await prisma.order.findFirst({
        where: { userId, status: "PROCESSING" },
        include: {
          items: {
            include: { product: true },
          },
        },
      });

      if (!order) {
        res
          .status(404)
          .json({ message: "Nenhum pedido em processamento encontrado." });
        return;
      }

      const line_items = order.items.map((item) => ({
        price_data: {
          currency: "brl",
          product_data: {
            name: item.product.name,
          },
          unit_amount: Math.round(item.product.price * 100),
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items,
        success_url: `${env.URL_FRONT}/cart/payment?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${env.URL_FRONT}/cart/payment?canceled=true`,
        metadata: { orderId: order.id },
        
      });

      res.json({ url: session.url });
    } catch (error) {
      console.error("Erro ao criar sessão de checkout Stripe:", error);
      res
        .status(500)
        .json({ message: "Erro ao criar sessão de checkout Stripe" });
    }
  }

  async webhook(req: Request, res: Response): Promise<void> {
  const sig = req.headers["stripe-signature"] as string; // verifco c realmnete veio do stripe
   console.log("Webhook recebido!");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig,
      env.STRIPE_SECRET_KEY 
    );
  } catch (err) {
    console.error("webbhook falhou:", err);
    res.status(400).json(`Webhook Error: ${err}`);
    return;
  }

  
if(event.type ==="checkout.session.completed"){
 const session = event.data.object
 const orderId = session.metadata?.orderId 

 if (orderId) {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "ITENS_PROCESSING" }, 
      });
    }
}
}

}


export { StripeController };
