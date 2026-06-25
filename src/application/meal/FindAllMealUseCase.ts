import type { IMealRepository } from '../../domain/meal/IMealRepository'

interface FindAllMealInput {
   userId: string
}

export class FindAllMealUseCase {
   constructor(private mealRepository: IMealRepository) {}

   async execute({ userId }: FindAllMealInput) {
      return this.mealRepository.findAll(userId)
   }
}
