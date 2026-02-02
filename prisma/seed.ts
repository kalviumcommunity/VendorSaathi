import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log("🌱 Seed started");

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@vendorsaathi.com" },
    update: {},
    create: {
      email: "admin@vendorsaathi.com",
      password_hash: "hashed_password",
      role: "ADMIN",
      is_active: true,
    },
  });

  await prisma.user.upsert({
    where: { email: "vendor@vendorsaathi.com" },
    update: {},
    create: {
      email: "vendor@vendorsaathi.com",
      password_hash: "hashed_password",
      role: "VENDOR",
      is_active: true,
    },
  });

  console.log("✅ Seed completed");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
