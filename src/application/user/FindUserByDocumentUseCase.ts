import type { IUserRepository } from '../../domain/user/IUserRepository'
import { AppError } from '../../shared/errors/AppError'
import { normalizeString } from '../../shared/utils/index'

interface FindUserByDocumentInput {
   document: string
}

export class FindUserByDocumentUseCase {
   constructor(private userRepository: IUserRepository) {}

   async execute({ document }: FindUserByDocumentInput) {
      const user = await this.userRepository.findByDocument(normalizeString(document))

      if (!user) {
         throw new AppError('User not found', 404)
      }

      return user
   }
}
