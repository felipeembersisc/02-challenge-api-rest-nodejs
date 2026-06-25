import { randomUUID } from 'node:crypto'
import type { IUserRepository } from '../../domain/user/IUserRepository'
import { AppError } from '../../shared/errors/AppError'
import { normalizeString } from '../../shared/utils/index'

interface CreateUserInput {
   name: string
   document: string
   email: string
   phone: string
   sessionId: string
}

export class CreateUserUseCase {
   constructor(private userRepository: IUserRepository) {}

   async execute(data: CreateUserInput) {
      const userExists = await this.userRepository.findByDocument(normalizeString(data.document))

      if (userExists) {
         throw new AppError('A user with this document already exists', 409)
      }

      return this.userRepository.create({
         usr_id: randomUUID(),
         usr_name: data.name,
         usr_document: normalizeString(data.document),
         usr_session_id: data.sessionId,
         usr_email: data.email,
         usr_phone: normalizeString(data.phone),
      })
   }
}
