import { randomUUID } from 'node:crypto'
import type { IMealRepository } from '../../domain/meal/IMealRepository'
import type { IUserRepository } from '../../domain/user/IUserRepository'
import { AppError } from '../../shared/errors/AppError'

interface CreateMealInput {
   userId: string
   name: string
   description?: string
   inDiet: boolean
   mealDate: string
   mealTime: string
}

export class CreateMealUseCase {
   constructor(
      private mealRepository: IMealRepository,
      private userRepository: IUserRepository
   ) {}

   async execute(data: CreateMealInput) {
      const userExists = await this.userRepository.findById(data.userId)

      if (!userExists) {
         throw new AppError('User not found', 404)
      }

      return this.mealRepository.create({
         mea_id: randomUUID(),
         mea_user_id: data.userId,
         mea_name: data.name,
         mea_description: data.description,
         mea_in_diet: data.inDiet,
         mea_date: data.mealDate,
         mea_time: data.mealTime,
      })
   }
}
