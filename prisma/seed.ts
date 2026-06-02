import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.lead.deleteMany();

  await prisma.lead.createMany({
    data: [
      {
        firstName: "Walter",
        lastName: "White",
        phone: "+1 555 123 4567",
        email: "heisenberg@example.com",
      },
      {
        firstName: "Jesse",
        lastName: "Pinkman",
        phone: "+1 555 987 6543",
        email: "pinky@example.com",
      },
      {
        firstName: "James",
        lastName: "McGill",
        phone: "+1 555 222 1111",
        email: "saul_goodman@example.com",
      },
    ],
  });

  console.log("Seed completed");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());