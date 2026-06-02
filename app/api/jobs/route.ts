// import { NextRequest, NextResponse } from "next/server";

// import { prisma } from "@/lib/db";
// import { sendSlackMessage } from "@/lib/slack";

// export async function POST(
//   request: NextRequest
// ) {
//   const body = await request.json();

//   const result = await prisma.$transaction(
//     async (tx) => {
//       const job = await tx.job.create({
//         data: {
//           leadId: body.leadId,

//           jobType: body.jobType,
//           leadSource: body.leadSource,
//           description: body.description,

//           address: body.address,
//           city: body.city,
//           zip: body.zip,
//           area: body.area,

//           startDate: body.startDate,
//           startTime: body.startTime,
//           endTime: body.endTime,

//           technician: body.technician,
//         },
//       });

//       await tx.eventLog.create({
//         data: {
//           jobId: job.id,
//           type: "JOB_CREATED",
//           message: `Job #${job.id} created`,
//         },
//       });

//       const lead =
//         await tx.lead.findUnique({
//           where: {
//             id: body.leadId,
//           },
//         });

//       await sendSlackMessage(
//         `
//         New Job Created

//         Job ID: ${job.id}

//         Customer:
//         ${lead!.firstName} ${lead!.lastName}

//         Phone:
//         ${lead!.phone}

//         Job Type:
//         ${job.jobType}

//         Status:
//         ${job.status}
//       `
//       );

//       await prisma.eventLog.create({
//         data: {
//           jobId: job.id,
//           type: "SLACK",
//           message:
//             "Slack notification sent",
//         },
//       });

//       return job;
//     }
//   );

//   return NextResponse.json(result);
// }


import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { sendSlackMessage } from "@/lib/slack";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { job, lead } = await prisma.$transaction(async (tx) => {
    const created = await tx.job.create({
      data: {
        leadId: body.leadId,
        jobType: body.jobType,
        leadSource: body.leadSource,
        description: body.description,
        address: body.address,
        city: body.city,
        zip: body.zip,
        area: body.area,
        startDate: body.startDate,
        startTime: body.startTime,
        endTime: body.endTime,
        technician: body.technician,
      },
    });

    await tx.eventLog.create({
      data: {
        jobId: created.id,
        type: "JOB_CREATED",
        message: `Job #${created.id} created`,
      },
    });

    const lead = await tx.lead.findUnique({
      where: { id: body.leadId },
    });

    if (!lead) {
      throw new Error(`Lead with id ${body.leadId} not found`);
    }

    return { job: created, lead };
  });

  try {
    await sendSlackMessage(`
      New Job Created
      Job ID: ${job.id}
      Customer: ${lead.firstName} ${lead.lastName}
      Phone: ${lead.phone}
      Job Type: ${job.jobType}
      Status: ${job.status}
    `);

    await prisma.eventLog.create({
      data: {
        jobId: job.id,
        type: "SLACK",
        message: "Slack notification sent",
      },
    });
  } catch (error) {
    console.error(error);

    await prisma.eventLog.create({
      data: {
        jobId: job.id,
        type: "SLACK_ERROR",
        message:
          "Failed to send Slack notification",
      },
    });
  }

  return NextResponse.json(job);
}