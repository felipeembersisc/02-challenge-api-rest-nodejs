import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  document: z
    .string()
    .trim()
    .min(11, "Document must have at least 11 characters"),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
