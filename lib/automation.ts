import { prisma } from "@/lib/db";
import { appendJobRow } from "@/lib/googleSheets";
import { sendSlackMessage } from "@/lib/slack";

export async function runJobAutomation(
  jobId: number,
  eventType: string
) {
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
    include: {
      lead: true,
    },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  try {
    await sendSlackMessage(`
      ${eventType}

      Job ID: ${job.id}

      Customer:
      ${job.lead.firstName} ${job.lead.lastName}

      Phone:
      ${job.lead.phone}

      Job Type:
      ${job.jobType}

      Status:
      ${job.status}
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
        message: "Failed to send Slack notification",
      },
    });
  }

  try {
    await appendJobRow([
      String(job.id),
      `${job.lead.firstName} ${job.lead.lastName}`,
      job.lead.phone,
      job.jobType,
      job.technician,
      job.status,
      eventType,
      new Date().toISOString(),
    ]);

    await prisma.eventLog.create({
      data: {
        jobId: job.id,
        type: "GOOGLE_SHEETS",
        message: "Google Sheets updated",
      },
    });
  } catch (error) {
    console.error(error);

    await prisma.eventLog.create({
      data: {
        jobId: job.id,
        type: "GOOGLE_SHEETS_ERROR",
        message: "Failed to update Google Sheets",
      },
    });
  }
}