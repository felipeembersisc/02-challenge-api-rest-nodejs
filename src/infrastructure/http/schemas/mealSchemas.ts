import { z } from 'zod'

export const CreateMealSchema = z.object({
   userId: z.string(),
   name: z.string(),
   description: z.string().optional(),
   inDiet: z.boolean().default(true),
   mealDate: z.string(),
   mealTime: z.string(),
})

export const UpdateMealSchema = z.object({
   userId: z.string(),
   name: z.string(),
   description: z.string().optional(),
   inDiet: z.boolean().default(true),
   mealDate: z.string(),
   mealTime: z.string(),
})

export const MealParamsSchema = z.object({
   id: z.string().uuid(),
})

export const MealUserQuerySchema = z.object({
   userId: z.string().uuid(),
})

export type CreateMealInput = z.infer<typeof CreateMealSchema>
export type UpdateMealInput = z.infer<typeof UpdateMealSchema>
export type MealParams = z.infer<typeof MealParamsSchema>
export type MealUserQuery = z.infer<typeof MealUserQuerySchema>
