import type { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto";
import type { CreateUserInput } from "../schemas/user.schema.ts";
import {
  UserAlreadyExistsError,
  createUser,
} from "../services/users.service.ts";

export async function createUserController(
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply,
) {
  const { name, document } = request.body;

  let { sessionId } = request.cookies;

  if (!sessionId) {
    sessionId = randomUUID();
    reply.setCookie("sessionId", sessionId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  try {
    await createUser({ name, document, sessionId });

    return reply.status(201).send({
      error: false,
      data: null,
      message: "User created successfully",
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.code(409).send({
        error: true,
        data: null,
        message: err.message,
      });
    }

    return reply.status(500).send({
      error: true,
      data: null,
      message: "An unexpected error occurred",
    });
  }
}
