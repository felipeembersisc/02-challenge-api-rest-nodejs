import type { IMealRepository } from '../../domain/meal/IMealRepository'
import type { IUserRepository } from '../../domain/user/IUserRepository'
import { AppError } from '../../shared/errors/AppError'

interface UpdateMealInput {
   mealId: string
   userId: string
   name: string
   description?: string
   inDiet: boolean
   mealDate: string
   mealTime: string
}

export class UpdateMealUseCase {
   constructor(
      private mealRepository: IMealRepository,
      private userRepository: IUserRepository
   ) {}

   async execute(data: UpdateMealInput) {
      const userExists = await this.userRepository.findById(data.userId)

      if (!userExists) {
         throw new AppError('User not found', 404)
      }

      const mealExists = await this.mealRepository.findById(data.mealId, data.userId)

      if (!mealExists) {
         throw new AppError('Meal not found', 404)
      }

      return this.mealRepository.update({
         mea_id: data.mealId,
         mea_user_id: data.userId,
         mea_name: data.name,
         mea_description: data.description,
         mea_in_diet: data.inDiet,
         mea_date: data.mealDate,
         mea_time: data.mealTime,
         mea_updated_at: new Date().toISOString(),
      })
   }
}
