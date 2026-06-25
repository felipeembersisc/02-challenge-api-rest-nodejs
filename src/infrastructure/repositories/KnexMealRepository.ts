import type { IMealRepository } from '../../domain/meal/IMealRepository'
import type { Meal, MealMetrics } from '../../domain/meal/Meal'
import { knexDb } from '../database/knexClient'

export class KnexMealRepository implements IMealRepository {
   async findAll(userId: string): Promise<Meal[] | []> {
      return await knexDb('meals').select('*').where('mea_user_id', userId)
   }

   async findById(id: string, userId: string): Promise<Meal | undefined> {
      return await knexDb('meals')
         .select('*')
         .where('mea_id', id)
         .andWhere('mea_user_id', userId)
         .first()
   }

   async create(
      data: Omit<Meal, 'mea_created_at' | 'mea_updated_at'>
   ): Promise<{ mea_id: string }[]> {
      return await knexDb('meals').insert(data).returning('mea_id')
   }

   async update(data: Omit<Meal, 'mea_created_at'>): Promise<{ mea_id: string }[]> {
      return await knexDb('meals')
         .update(data)
         .where('mea_id', data.mea_id)
         .andWhere('mea_user_id', data.mea_user_id)
         .returning('mea_id')
   }

   async delete(id: string, userId: string): Promise<void> {
      await knexDb('meals').delete().where('mea_id', id).andWhere('mea_user_id', userId)
   }

   async getMetrics(userId: string): Promise<MealMetrics> {
      const [{ total }] = await knexDb('meals')
         .where('mea_user_id', userId)
         .count('mea_id as total')

      const [{ inDiet }] = await knexDb('meals')
         .where('mea_user_id', userId)
         .where('mea_in_diet', true)
         .count('mea_id as inDiet')

      const [{ outOfDiet }] = await knexDb('meals')
         .where('mea_user_id', userId)
         .where('mea_in_diet', false)
         .count('mea_id as outOfDiet')

      const meals = await knexDb('meals')
         .select('mea_in_diet')
         .where('mea_user_id', userId)
         .orderBy('mea_date', 'asc')
         .orderBy('mea_time', 'asc')

      let bestStreak = 0
      let currentStreak = 0
      for (const meal of meals) {
         if (meal.mea_in_diet) {
            currentStreak++
            if (currentStreak > bestStreak) bestStreak = currentStreak
         } else {
            currentStreak = 0
         }
      }

      return {
         total: Number(total),
         inDiet: Number(inDiet),
         outOfDiet: Number(outOfDiet),
         bestStreak,
      }
   }
}
