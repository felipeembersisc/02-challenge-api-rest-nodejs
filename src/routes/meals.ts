import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import {createMealController} from "../controllers/meals.controller.ts";
import {ensureSession} from "../middlewares/ensure-session.middleware.ts";
import {CreateMealSchema} from "../schemas/meal.schema.ts";

export async function mealsRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/",
    {
      preHandler: [ensureSession],
      schema: { body: CreateMealSchema }
    },
    createMealController
  );
}