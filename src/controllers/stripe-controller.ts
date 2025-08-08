import { Request, Response } from "express";
import Stripe from "stripe";
import { prisma } from "@/database/prisma.js";
import { env } from "@/utils/env.js";
import { ProductsUnuvaliable } from "@/services/controller/stripe/productsUnavaliable.js";
import { veryfyOrdersStatus } from "@/services/controller/stripe/verifyordersStatus.js";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil",
});

class StripeController {
  async create(req: Request, res: Response): Promise<void> {
    const userId = req.user!.id;

    try {
      const order = await veryfyOrdersStatus(userId); 

      if (!order) {
        res
          .status(404)
          .json({ message: "Nenhum pedido em processamento encontrado." });
        return;
      }
      const unavailableProducts = await ProductsUnuvaliable(order); 

      if (unavailableProducts.length > 0) {
        res.status(400).json({
          message: "Alguns produtos não estão mais disponíveis nessa quantidade.",
          product: unavailableProducts,
        });
        return;
      }
      // tiver produto na quantidade certa e o pedido ent abre o stripe 
      
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
}

export { StripeController };
