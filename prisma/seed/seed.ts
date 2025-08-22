import { prisma } from "@/database/prisma.js";
import { ProductsSedd } from "./products.js"; 
import { ReportTestProd } from "./testprod.js";
import { seedUsers } from "./seed-user.js";

async function seedPrincipal() {
  try {
    console.log("Running dayOfWeek seed...");
  await ReportTestProd()

    console.log("Running products seed...");
    await ProductsSedd();

     console.log("user")
    await seedUsers();

    console.log("All seeds executed successfully.");
  } catch (error) {
    console.error("Error in seeding process:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedPrincipal();
