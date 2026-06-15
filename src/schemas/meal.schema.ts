import { z } from "zod";

export const CreateMealSchema = z.object({
  userId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  inDiet: z.boolean().default(true),
  mealDate: z.string(),
  mealTime: z.string(),
});

export type CreateMealInput = z.infer<typeof CreateMealSchema>;
