import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
   createMealController,
   deleteMealController,
   findAllMealsController,
   findMealByIdController,
   getMealMetricsController,
   updateMealController,
} from '../controllers/MealController'
import { ensureSession } from '../middlewares/ensureSession'
import {
   CreateMealSchema,
   MealParamsSchema,
   MealUserQuerySchema,
   UpdateMealSchema,
} from '../schemas/mealSchemas'

export async function mealRoutes(app: FastifyInstance) {
   app.withTypeProvider<ZodTypeProvider>().post(
      '/',
      {
         preHandler: [ensureSession],
         schema: { body: CreateMealSchema },
      },
      createMealController,
   )

   app.withTypeProvider<ZodTypeProvider>().get(
      '/',
      {
         preHandler: [ensureSession],
         schema: { querystring: MealUserQuerySchema },
      },
      findAllMealsController,
   )

   app.withTypeProvider<ZodTypeProvider>().get(
      '/:id',
      {
         preHandler: [ensureSession],
         schema: { params: MealParamsSchema, querystring: MealUserQuerySchema },
      },
      findMealByIdController,
   )

   app.withTypeProvider<ZodTypeProvider>().put(
      '/:id',
      {
         preHandler: [ensureSession],
         schema: { params: MealParamsSchema, body: UpdateMealSchema },
      },
      updateMealController,
   )

   app.withTypeProvider<ZodTypeProvider>().delete(
      '/:id',
      {
         preHandler: [ensureSession],
         schema: { params: MealParamsSchema, querystring: MealUserQuerySchema },
      },
      deleteMealController,
   )

   app.withTypeProvider<ZodTypeProvider>().get(
      '/metrics',
      {
         preHandler: [ensureSession],
         schema: { querystring: MealUserQuerySchema },
      },
      getMealMetricsController,
   )
}
