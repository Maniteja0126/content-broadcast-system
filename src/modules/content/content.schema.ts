import { z } from "zod";

export const uploadContentSchema = z.object({
  title: z.string().min(1),
  subject: z.string().min(1),
  description: z.string().optional(),

  startTime: z.coerce.date().optional(),
  endTime: z.coerce.date().optional(),

  rotationDurationMin: z.coerce.number().int().positive().optional(),
});