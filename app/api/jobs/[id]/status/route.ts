import { NextRequest, NextResponse }
from "next/server";

import { prisma } from "@/lib/db";
import { sendSlackMessage } from "@/lib/slack";

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

  try {
    await sendSlackMessage(`Job ${job.id} status -> ${job.status}`);

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