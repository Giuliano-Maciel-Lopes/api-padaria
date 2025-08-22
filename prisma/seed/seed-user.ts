
import { prisma } from "@/database/prisma.js";
import { env } from "@/utils/env.js";
import bcrypt from "bcrypt";

export async function seedUsers() {
  // Senhas simples para seed
  const passwordAdmin = await bcrypt.hash(env.ADMIN_PASSWORD, 10);
  const passwordStockista = await bcrypt.hash(env.STOCK_PASSWORD, 10);
  const passwordDelivered = await bcrypt.hash(env.STOCK_PASSWORD, 10);

  await prisma.user.createMany({
    data: [
      // 2 Admin
      { name: "ADM1 Padaria", email: "admin1@padaria.com", password: passwordAdmin, role: "ADMIN" },
      { name: "ADM2 Padaria", email: "admin2@padaria.com", password: passwordAdmin, role: "ADMIN" },

      // 2 Stockista
      { name: "Stock1 Padaria", email: "stock1@padaria.com", password: passwordStockista, role: "STOCK" },
      { name: "Stock2 Padaria", email: "stock2@padaria.com", password: passwordStockista, role: "STOCK" },

      // 4 Delivered
      { name: "Delivery1 Padaria", email: "delivery1a@padaria.com", password: passwordDelivered, role: "DELIVERY_PERSON" },
      { name: "Delivery2 Padaria", email: "delivery2c@padaria.com", password: passwordDelivered, role: "DELIVERY_PERSON" },
      { name: "Delivery3 Padaria", email: "delivery3e@padaria.com", password: passwordDelivered, role: "DELIVERY_PERSON" },
      { name: "Delivery4 Padaria", email: "delivery4g@padaria.com", password: passwordDelivered, role: "DELIVERY_PERSON" },
    ],
    skipDuplicates: true, // evita criar duplicados se rodar seed de novo
  });

  console.log("Seed de users concluída.");
}
