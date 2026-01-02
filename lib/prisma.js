import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import pg from "pg";

const connectionString = process.env.DATABASE_URL;

let prisma;

try {
  const pool = new pg.Pool({ connectionString });

  const adapter = new PrismaPg(pool);

  prisma = new PrismaClient({ adapter });
} catch (error) {
  console.error("Failed to create Prisma client:", error);
  throw error;
}

export { prisma };
