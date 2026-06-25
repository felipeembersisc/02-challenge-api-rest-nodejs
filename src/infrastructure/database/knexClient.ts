import knex, { type Knex } from 'knex'
import { env } from '../../shared/env'

export const config: Knex.Config = {
   client: env.DATABASE_CLIENT,
   connection: env.DATABASE_CLIENT === 'sqlite' ? { filename: env.DATABASE_URL } : env.DATABASE_URL,
   useNullAsDefault: true,
   migrations: {
      extension: 'ts',
      directory: './src/infrastructure/database/migrations',
   },
}

export const knexDb = knex(config)
