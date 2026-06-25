import type { IUserRepository } from '../../domain/user/IUserRepository'
import type { User } from '../../domain/user/User'
import { knexDb } from '../database/knexClient'

export class KnexUserRepository implements IUserRepository {
   async findByDocument(document: string): Promise<User | undefined> {
      return await knexDb('users').where('usr_document', document).select('*').first()
   }

   async findById(id: string): Promise<User | undefined> {
      return await knexDb('users').where('usr_id', id).select('*').first()
   }

   async create(data: Omit<User, 'usr_created_at'>): Promise<User[]> {
      return await knexDb('users').insert(data).returning('*')
   }
}
