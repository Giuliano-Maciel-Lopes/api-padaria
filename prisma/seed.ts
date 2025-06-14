import { prisma } from "@/database/prisma.js";
import { log } from "console";

async function seed() {
  await prisma.dayOfWeek.createMany({ data: [ 
      { name: "segunda feira" },
      { name: "terça feira" },
      { name: "quarta feira" },
      { name: "quinta feira" },
      { name: "sexta feira" },
      { name: "sábado" },
      { name: "todos os dias" }, // Especial
    ],

   // skipDuplicates: true, // evita erro se rodar mais de uma vez] 
    });

}
seed().then(()=>{
    console.log("sedd executado")
    prisma.$disconnect()
})