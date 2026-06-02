import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { runJobAutomation } from "@/lib/automation";

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

  await runJobAutomation(
    job.id,
    "JOB CREATED"
  );

  return NextResponse.json(job);
}