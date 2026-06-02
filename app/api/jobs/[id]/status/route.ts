import { NextRequest, NextResponse }
from "next/server";

import { prisma } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } =
    await context.params;

  const body =
    await request.json();

  const result = await prisma.$transaction(
    async (tx) => {
      const job = await tx.job.update({
        where: {
          id: Number(id),
        },
        data: {
          status: body.status,
        },
      });

      await tx.eventLog.create({
        data: {
          jobId: job.id,
          type: "STATUS_CHANGED",
          message: `Status changed to ${body.status}`,
        },
      });

      return job;
    }
  );

  return NextResponse.json(result);
}