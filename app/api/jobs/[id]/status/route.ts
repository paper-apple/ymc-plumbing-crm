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

  const job =
    await prisma.job.update({
      where: {
        id: Number(id),
      },
      data: {
        status: body.status,
      },
    });

  return NextResponse.json(job);
}