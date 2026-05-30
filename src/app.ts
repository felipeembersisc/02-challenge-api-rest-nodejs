import cookie from "@fastify/cookie";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import fastify, { type FastifyError } from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { usersRoutes } from "./routes/users.ts";

export const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(swagger, {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "Challenge API REST",
      description: "Documentação da API REST NodeJS Challenge",
      version: "1.0.0",
    },
    tags: [{ name: "Users", description: "Operações relacionadas a usuários" }],
  },
  transform: jsonSchemaTransform,
});

app.register(swaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
  },
});

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
