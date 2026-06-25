import type { IMealRepository } from '../../domain/meal/IMealRepository'
import { AppError } from '../../shared/errors/AppError'

interface FindMealByIdInput {
   id: string
   userId: string
}

export class FindMealByIdUseCase {
   constructor(private mealRepository: IMealRepository) {}

   async execute({ id, userId }: FindMealByIdInput) {
      const meal = await this.mealRepository.findById(id, userId)

      if (!meal) {
         throw new AppError('Meal not found', 404)
      }

      return meal
   }
}
