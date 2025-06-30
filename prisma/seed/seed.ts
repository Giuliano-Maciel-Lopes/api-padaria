import { prisma } from "@/database/prisma.js";
import { ProductsSedd } from "./products.js"; 
import { dayOfWeekSedd } from "./dayofweek.js";

async function seedPrincipal() {
  try {
    console.log("Running dayOfWeek seed...");
    await dayOfWeekSedd();

    console.log("Running products seed...");
    await ProductsSedd();

    console.log("All seeds executed successfully.");
  } catch (error) {
    console.error("Error in seeding process:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedPrincipal();
