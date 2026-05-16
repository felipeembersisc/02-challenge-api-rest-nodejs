import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { randomUUID } from 'node:crypto';
import { knexDb } from '../database.ts';
import { CreateUserSchema } from '../schemas/user.schema.ts';
import { normalizeCpf } from '../utils/index.ts';

export async function usersRoutes(app: FastifyInstance) {
	app.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
		const parsed = CreateUserSchema.safeParse(request.body);

		if (!parsed.success) {
			const fields = parsed.error.issues.map((issue) => ({
				message: issue.message,
				field: issue.path.join('.'),
			}));

			return reply.code(400).send({
				error: true,
				data: null,
				message: 'Please check the submitted information',
				fields,
			});
		}

		const { name, document } = parsed.data;

		try {
			const userExists = await knexDb('users')
				.where('usr_document', document)
				.select('usr_id')
				.first();

			if (userExists) {
				return reply.code(409).send({
					error: true,
					data: null,
					message: 'A user with this document already exists',
				});
			}

			let { sessionId } = request.cookies;

			if (!sessionId) {
				sessionId = randomUUID();

				reply.setCookie('sessionId', sessionId, {
					path: '/',
					maxAge: 60 * 60 * 24 * 7, // 7 days
				});
			}

			await knexDb('users').insert({
				usr_id: randomUUID(),
				usr_name: name,
				usr_document: normalizeCpf(document),
				usr_session_id: sessionId,
			});

			return reply.status(201).send({
				error: false,
				data: null,
				message: 'User created successfully',
			});
		} catch {
			return reply.status(500).send({
				error: true,
				data: null,
				message: 'An unexpected error occurred',
			});
		}
	});
}
