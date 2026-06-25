import { z } from 'zod'

export const CreateUserSchema = z.object({
   name: z.string().min(3, 'Name must be at least 3 characters'),
   document: z.string().min(11, 'Document must have at least 11 characters'),
   email: z.string(),
   phone: z.string(),
})

export const UserParamsSchema = z.object({
   id: z.string().uuid(),
})

export type CreateUserInput = z.infer<typeof CreateUserSchema>
export type UserParams = z.infer<typeof UserParamsSchema>
