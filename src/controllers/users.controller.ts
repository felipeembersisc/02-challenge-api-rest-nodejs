import type { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto";
import type { CreateUserInput } from "../schemas/user.schema.ts";
import {
  UserAlreadyExistsError,
  createUser,
} from "../services/users.service.ts";

export async function createUserController(
  req: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply,
) {
  let { sessionId } = req.cookies;

  if (!sessionId) {
    sessionId = randomUUID();
    reply.setCookie("sessionId", sessionId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  try {
    const userCreated = await createUser({...req.body, sessionId});

    return reply.status(201).send({
      error: false,
      data: userCreated,
      message: "User created successfully",
    });
  } catch (e:any) {
    if (e instanceof UserAlreadyExistsError) {
      return reply.code(409).send({
        error: true,
        data: null,
        message: e.message,
      });
    }

    return reply.status(500).send({
      error: true,
      data: null,
      message: "An unexpected error occurred",
    });
  }
}
