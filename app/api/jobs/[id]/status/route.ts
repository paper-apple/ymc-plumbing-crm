import { NextRequest, NextResponse }
from "next/server";

import { prisma } from "@/lib/db";
import { runJobAutomation } from "@/lib/automation";

export async function PATCH(
  request: NextRequest,
  context: {params: Promise<{ id: string; }>}
) {
  const { id } = await context.params;

  const body = await request.json();

  const job = await prisma.$transaction(async (tx) => {
    const updated = await tx.job.update({
      where: { id: Number(id) },
      data: { status: body.status },
    });

    await tx.eventLog.create({
      data: {
        jobId: updated.id,
        type: "STATUS_CHANGED",
        message: `Status changed to ${body.status}`,
      },
    });

    return updated;
  });

  await runJobAutomation(
    job.id,
    `STATUS CHANGED → ${job.status}`
  );
  
  return NextResponse.json(job);
}