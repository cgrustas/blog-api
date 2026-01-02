import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import pg from "pg";

const connectionString = process.env.DATABASE_URL;

let prisma;

try {
  console.log("Creating pg Pool...");
  const pool = new pg.Pool({ connectionString });
  
  console.log("Creating PrismaPg adapter...");
  const adapter = new PrismaPg(pool);
  
  console.log("Creating PrismaClient...");
  prisma = new PrismaClient({ adapter });
  
  console.log("Prisma client created successfully");
} catch (error) {
  console.error("Failed to create Prisma client:", error);
  throw error;
}

export { prisma };
