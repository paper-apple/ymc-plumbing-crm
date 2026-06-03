import { NextRequest, NextResponse }
  from "next/server";

import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const lead = await prisma.lead.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      email: body.email || null,
    },
  });

  return NextResponse.json(lead);
}