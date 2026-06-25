export interface Meal {
   mea_id: string
   mea_user_id: string
   mea_name: string
   mea_description?: string
   mea_in_diet: boolean
   mea_date: string
   mea_time: string
   mea_created_at?: string
   mea_updated_at?: string
}

export interface MealMetrics {
   total: number
   inDiet: number
   outOfDiet: number
   bestStreak: number
}
