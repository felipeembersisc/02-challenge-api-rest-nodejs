import type { IMealRepository } from '../../domain/meal/IMealRepository'
import { AppError } from '../../shared/errors/AppError'

interface DeleteMealInput {
   id: string
   userId: string
}

export class DeleteMealUseCase {
   constructor(private mealRepository: IMealRepository) {}

   async execute({ id, userId }: DeleteMealInput) {
      const mealExists = await this.mealRepository.findById(id, userId)

      if (!mealExists) {
         throw new AppError('Meal not found', 404)
      }

      return this.mealRepository.delete(id, userId)
   }
}
