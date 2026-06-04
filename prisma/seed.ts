import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.eventLog.deleteMany();
  await prisma.job.deleteMany();
  await prisma.lead.deleteMany();

  const leads = await prisma.lead.createMany({
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

  const leadList = await prisma.lead.findMany();

  await prisma.job.createMany({
    data: [
      {
        leadId: leadList[0].id,
        jobType: "Emergency Repair",
        leadSource: "Phone Call",
        description: "Severe leak under the kitchen sink. Urgent service required.",
        address: "123 Main Street",
        city: "Springfield",
        zip: "62701",
        area: "Downtown",
        startDate: "2026-06-05",
        startTime: "09:00",
        endTime: "11:00",
        technician: "Mike Ehrmantraut",
      },

      {
        leadId: leadList[1].id,
        jobType: "Water Heater",
        leadSource: "Website",
        description: "Annual maintenance of the water heater. Strange noise when heating.",
        address: "456 Oak Avenue",
        city: "Springfield",
        zip: "62702",
        area: "North Side",
        startDate: "2026-06-07",
        startTime: "14:00",
        endTime: "16:00",
        technician: "Mike Ehrmantraut",
      },

      {
        leadId: leadList[0].id,
        jobType: "Drain Cleaning",
        leadSource: "Referral",
        description: "The bathroom sink is clogged. The water is running very slowly.",
        address: "789 Pine Street",
        city: "Springfield",
        zip: "62703",
        area: "East Side",
        startDate: "2026-06-08",
        startTime: "10:00",
        endTime: "12:00",
        technician: "Hank Schrader",
      },
    ],
  });

  console.log("Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());