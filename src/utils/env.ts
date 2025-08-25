import dotenv from "dotenv"; //  carregar variáveis de ambiente que você define em um arquivo
// .env para dentro da aplicação em process.env. // resolbendo bug
dotenv.config();

import z from "zod";

const schemaEnv = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET_KEY: z.string(),
  ADMIN_PASSWORD: z.string(),
  STOCK_PASSWORD: z.string(),
  DELIVERY_PASSWORD: z.string(),
  URL_FRONT: z.string(),
  PORT: z.coerce.number().default(3333),
  
});
export const env = schemaEnv.parse(process.env);
