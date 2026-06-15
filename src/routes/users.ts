import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { createUserController } from "../controllers/users.controller.ts";
import {CreateUserSchema} from "../schemas/user.schema.ts";

export async function usersRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/",
    {schema: { body:  CreateUserSchema } },
    createUserController
  );
}
