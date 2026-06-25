import { CreateUserUseCase } from '../application/user/CreateUserUseCase'
import { FindUserByDocumentUseCase } from '../application/user/FindUserByDocumentUseCase'
import { FindUserByIdUseCase } from '../application/user/FindUserByIdUseCase'
import { KnexUserRepository } from '../infrastructure/repositories/KnexUserRepository'

export function makeCreateUserUseCase() {
   const userRepository = new KnexUserRepository()
   return new CreateUserUseCase(userRepository)
}

export function makeFindUserByIdUseCase() {
   const userRepository = new KnexUserRepository()
   return new FindUserByIdUseCase(userRepository)
}

export function makeFindUserByDocumentUseCase() {
   const userRepository = new KnexUserRepository()
   return new FindUserByDocumentUseCase(userRepository)
}
