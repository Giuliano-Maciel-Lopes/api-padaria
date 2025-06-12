import dotenv from "dotenv"; //  carregar variáveis de ambiente que você define em um arquivo 
// .env para dentro da aplicação em process.env. // resolbendo bug 
dotenv.config(); 

import z from "zod";


const schemaEnv = z.object({
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string()
})
 export const env = schemaEnv.parse(process.env)