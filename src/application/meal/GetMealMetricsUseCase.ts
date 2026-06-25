import type { IMealRepository } from '../../domain/meal/IMealRepository'
import type { IUserRepository } from '../../domain/user/IUserRepository'
import { AppError } from '../../shared/errors/AppError'

interface GetMealMetricsInput {
   userId: string
}

export class GetMealMetricsUseCase {
   constructor(
      private readonly mealRepository: IMealRepository,
      private readonly userRepository: IUserRepository,
   ) {}

   async execute({ userId }: GetMealMetricsInput) {
      const user = await this.userRepository.findById(userId)
      if (!user) throw new AppError('User not found', 404)

      return await this.mealRepository.getMetrics(userId)
   }
}
