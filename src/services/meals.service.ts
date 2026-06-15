import { randomUUID } from "node:crypto";
import { knexDb } from "../database.ts";
import type { CreateMealInput } from "../schemas/meal.schema.ts";

export async function createMeal(data: CreateMealInput) {
  const userExists = await knexDb("users")
    .where("usr_id", data.userId)
    .select("*")
    .first();

  if (!userExists) {
    throw new Error("User not found!");
  }

  return knexDb("meals")
    .insert({
      mea_id: randomUUID(),
      mea_user_id: data.userId,
      mea_name: data.name,
      mea_description: data.description,
      mea_in_diet: data.inDiet,
      mea_date: data.mealDate,
      mea_time: data.mealTime,
    })
    .returning("mea_id");
}
