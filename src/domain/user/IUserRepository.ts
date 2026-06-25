import type { User } from './User'

export interface IUserRepository {
   findByDocument(document: string): Promise<User | undefined>
   findById(id: string): Promise<User | undefined>
   create(data: Omit<User, 'usr_created_at'>): Promise<User[]>
}
