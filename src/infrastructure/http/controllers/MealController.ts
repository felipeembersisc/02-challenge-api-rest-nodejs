import type { FastifyReply, FastifyRequest } from 'fastify'
import {
   makeCreateMealUseCase,
   makeDeleteMealUseCase,
   makeFindAllMealUseCase,
   makeFindMealByIdUseCase,
   makeGetMealMetricsUseCase,
   makeUpdateMealUseCase,
} from '../../../factories/MealFactory'
import type {
   CreateMealInput,
   MealParams,
   MealUserQuery,
   UpdateMealInput,
} from '../schemas/mealSchemas'

export async function createMealController(
   req: FastifyRequest<{ Body: CreateMealInput }>,
   reply: FastifyReply,
) {
   const createMeal = makeCreateMealUseCase()
   const resultMealCreated = await createMeal.execute(req.body)

   return reply.status(201).send({
      error: false,
      data: resultMealCreated,
      message: 'Meal created successfully',
   })
}

export async function findAllMealsController(
   req: FastifyRequest<{ Querystring: MealUserQuery }>,
   reply: FastifyReply,
) {
   const { userId } = req.query
   const findAllMeals = makeFindAllMealUseCase()
   const meals = await findAllMeals.execute({ userId })

   return reply.status(200).send({
      error: false,
      data: meals,
      message: 'Meals found successfully',
   })
}

export async function findMealByIdController(
   req: FastifyRequest<{ Params: MealParams; Querystring: MealUserQuery }>,
   reply: FastifyReply,
) {
   const { id } = req.params
   const { userId } = req.query
   const findMealById = makeFindMealByIdUseCase()
   const meal = await findMealById.execute({ id, userId })

   return reply.status(200).send({
      error: false,
      data: meal,
      message: 'Meal found successfully',
   })
}

export async function updateMealController(
   req: FastifyRequest<{ Params: MealParams; Body: UpdateMealInput }>,
   reply: FastifyReply,
) {
   const { id: mealId } = req.params
   const updateMeal = makeUpdateMealUseCase()
   const updatedMeal = await updateMeal.execute({ mealId, ...req.body })

   return reply.status(200).send({
      error: false,
      data: updatedMeal,
      message: 'Meal updated successfully',
   })
}

export async function deleteMealController(
   req: FastifyRequest<{ Params: MealParams; Querystring: MealUserQuery }>,
   reply: FastifyReply,
) {
   const { id } = req.params
   const { userId } = req.query
   const deleteMeal = makeDeleteMealUseCase()
   await deleteMeal.execute({ id, userId })

   return reply.status(204).send()
}

export async function getMealMetricsController(
   req: FastifyRequest<{ Querystring: MealUserQuery }>,
   reply: FastifyReply,
) {
   const { userId } = req.query
   const getMetrics = makeGetMealMetricsUseCase()
   const metrics = await getMetrics.execute({ userId })

   return reply.status(200).send({
      error: false,
      data: metrics,
      message: 'Metrics retrieved successfully',
   })
}
