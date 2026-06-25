import { CreateMealUseCase } from '../application/meal/CreateMealUseCase'
import { DeleteMealUseCase } from '../application/meal/DeleteMealUseCase'
import { FindAllMealUseCase } from '../application/meal/FindAllMealUseCase'
import { FindMealByIdUseCase } from '../application/meal/FindMealByIdUseCase'
import { GetMealMetricsUseCase } from '../application/meal/GetMealMetricsUseCase'
import { UpdateMealUseCase } from '../application/meal/UpdateMealUseCase'
import { KnexMealRepository } from '../infrastructure/repositories/KnexMealRepository'
import { KnexUserRepository } from '../infrastructure/repositories/KnexUserRepository'

export function makeCreateMealUseCase() {
   const mealRepository = new KnexMealRepository()
   const userRepository = new KnexUserRepository()
   return new CreateMealUseCase(mealRepository, userRepository)
}

export function makeFindAllMealUseCase() {
   const mealRepository = new KnexMealRepository()
   return new FindAllMealUseCase(mealRepository)
}

export function makeFindMealByIdUseCase() {
   const mealRepository = new KnexMealRepository()
   return new FindMealByIdUseCase(mealRepository)
}

export function makeUpdateMealUseCase() {
   const mealRepository = new KnexMealRepository()
   const userRepository = new KnexUserRepository()
   return new UpdateMealUseCase(mealRepository, userRepository)
}

export function makeDeleteMealUseCase() {
   const mealRepository = new KnexMealRepository()
   return new DeleteMealUseCase(mealRepository)
}

export function makeGetMealMetricsUseCase() {
   const mealRepository = new KnexMealRepository()
   const userRepository = new KnexUserRepository()
   return new GetMealMetricsUseCase(mealRepository, userRepository)
}
