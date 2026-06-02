import { z } from "zod";

export const createJobSchema = z.object({
  jobType: z.string().min(1),
  leadSource: z.string().min(1),

  description: z.string().optional(),

  address: z.string().min(1),
  city: z.string().min(1),
  zip: z.string().min(1),
  area: z.string().min(1),

  startDate: z.string().min(1),
  startTime: z.string().min(1),
  endTime: z.string().min(1),

  technician: z.string().min(1),
});

export type CreateJobFormData =
  z.infer<typeof createJobSchema>;