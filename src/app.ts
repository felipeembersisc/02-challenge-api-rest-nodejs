import fastify, { type FastifyError } from "fastify";
import cookie from "@fastify/cookie";
import {serializerCompiler,validatorCompiler,} from "fastify-type-provider-zod";
import { usersRoutes } from "./routes/users.ts";
import { mealsRoutes } from "./routes/meals.ts";

export const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(cookie);

app.setErrorHandler((error: FastifyError, _request, reply) => {
  if (error.validation) {
    return reply.code(400).send({
      error: true,
      data: null,
      message: "Please check the submitted information",
      fields: error.validation.map((v) => ({
        message: v.message ?? "Invalid value",
        field:
          v.instancePath.replace(/^\//, "") ||
          String(v.params?.missingProperty ?? ""),
      })),
    });
  }

  return reply.code(error.statusCode ?? 500).send({
    error: true,
    data: null,
    message: error.message || "An unexpected error occurred",
  });
});

app.register(usersRoutes, { prefix: "/users" });
app.register(mealsRoutes, { prefix: "/meals" });
