import { z } from "zod";

export const SuccessResponse = z.object({
  error: z.literal(false),
  data: z.null(),
  message: z.string(),
});

export const ErrorResponse = z.object({
  error: z.literal(true),
  data: z.null(),
  message: z.string(),
  fields: z
    .array(z.object({ message: z.string(), field: z.string() }))
    .optional(),
});
