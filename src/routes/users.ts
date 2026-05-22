import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { createUserController } from '../controllers/users.controller.ts';
import { ErrorResponse, SuccessResponse } from '../schemas/response.schema.ts';
import { CreateUserSchema } from '../schemas/user.schema.ts';

export async function usersRoutes(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post('/', {
		schema: {
			tags: ['Users'],
			summary: 'Criar um novo usuário',
			description: 'Registra um novo usuário com nome e CPF',
			body: CreateUserSchema,
			response: {
				201: SuccessResponse,
				400: ErrorResponse,
				409: ErrorResponse,
				500: ErrorResponse,
			},
		},
	}, createUserController);
}
