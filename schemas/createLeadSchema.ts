import { z } from "zod";

export const createLeadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(1),

  email: z
    .string()
    .email()
    .optional()
    .or(z.literal("")),
});

export type CreateLeadFormData =
  z.infer<typeof createLeadSchema>;