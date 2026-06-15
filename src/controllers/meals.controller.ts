import type { FastifyReply, FastifyRequest } from "fastify";
import {createMeal} from "../services/meals.service.ts";
import {CreateMealInput, CreateMealSchema} from "../schemas/meal.schema.ts";

export async function createMealController(
  req: FastifyRequest<{Body: CreateMealInput}>,
  reply: FastifyReply,
) {
  try {
    const resultMealCreated = await createMeal(req.body);

    return reply.status(201).send({
      error: false,
      data: resultMealCreated,
      message: "Meal created successfully",
    })
  } catch (e:any) {
    return reply.status(500).send({
      error: true,
      data: e.message,
      message: "An unexpected error occurred",
    });
  }
}