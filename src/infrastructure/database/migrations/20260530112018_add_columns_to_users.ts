import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
   await knex.schema.alterTable('users', (table) => {
      table.text('usr_email').unique().notNullable().defaultTo('')
      table.text('usr_phone').notNullable().defaultTo('')
   })
}

export async function down(knex: Knex): Promise<void> {
   await knex.schema.alterTable('users', (table) => {
      table.dropColumns('usr_email', 'usr_phone')
   })
}
