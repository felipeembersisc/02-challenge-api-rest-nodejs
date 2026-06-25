import type { FastifyReply, FastifyRequest } from 'fastify'
import { randomUUID } from 'node:crypto'
import {
   makeCreateUserUseCase,
   makeFindUserByIdUseCase,
} from '../../../factories/UserFactory'
import type { CreateUserInput, UserParams } from '../schemas/userSchemas'

export async function createUserController(
   req: FastifyRequest<{ Body: CreateUserInput }>,
   reply: FastifyReply
) {
   let { sessionId } = req.cookies

   if (!sessionId) {
      sessionId = randomUUID()
      reply.setCookie('sessionId', sessionId, {
         path: '/',
         maxAge: 60 * 60 * 24 * 7,
      })
   }

   const createUser = makeCreateUserUseCase()
   const userCreated = await createUser.execute({ ...req.body, sessionId })

   return reply.status(201).send({
      error: false,
      data: userCreated,
      message: 'User created successfully',
   })
}

export async function findUserByIdController(
   req: FastifyRequest<{ Params: UserParams }>,
   reply: FastifyReply
) {
   const { id } = req.params
   const findUserById = makeFindUserByIdUseCase()
   const user = await findUserById.execute({ id })

   return reply.status(200).send({
      error: false,
      data: user,
      message: 'User found successfully',
   })
}
