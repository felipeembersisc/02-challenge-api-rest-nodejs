import type { Meal, MealMetrics } from './Meal'

export interface IMealRepository {
   findAll(userId: string): Promise<Meal[] | []>
   findById(id: string, userId: string): Promise<Meal | undefined>
   create(data: Omit<Meal, 'mea_created_at' | 'mea_updated_at'>): Promise<{ mea_id: string }[]>
   update(data: Omit<Meal, 'mea_created_at'>): Promise<{ mea_id: string }[]>
   delete(id: string, userId: string): Promise<void>
   getMetrics(userId: string): Promise<MealMetrics>
}
