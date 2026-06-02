import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export async function POST(
  request: NextRequest
) {
  const body = await request.json();

  const result = await prisma.$transaction(
    async (tx) => {
      const job = await tx.job.create({
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
          jobId: job.id,
          type: "JOB_CREATED",
          message: `Job #${job.id} created`,
        },
      });

      return job;
    }
  );

  return NextResponse.json(result);
}