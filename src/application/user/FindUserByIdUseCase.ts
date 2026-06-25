import type { IUserRepository } from '../../domain/user/IUserRepository'
import { AppError } from '../../shared/errors/AppError'

interface FindUserByIdInput {
   id: string
}

export class FindUserByIdUseCase {
   constructor(private userRepository: IUserRepository) {}

   async execute({ id }: FindUserByIdInput) {
      const user = await this.userRepository.findById(id)

      if (!user) {
         throw new AppError('User not found', 404)
      }

      return user
   }
}
