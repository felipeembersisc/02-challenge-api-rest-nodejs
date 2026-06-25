import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
   createUserController,
   findUserByIdController,
} from '../controllers/UserController'
import { CreateUserSchema, UserParamsSchema } from '../schemas/userSchemas'

export async function userRoutes(app: FastifyInstance) {
   app.withTypeProvider<ZodTypeProvider>().post(
      '/',
      { schema: { body: CreateUserSchema } },
      createUserController
   )

   app.withTypeProvider<ZodTypeProvider>().get(
      '/:id',
      { schema: { params: UserParamsSchema } },
      findUserByIdController
   )
}
