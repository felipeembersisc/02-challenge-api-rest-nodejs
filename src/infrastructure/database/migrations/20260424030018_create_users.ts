import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
   await knex.schema.createTable('users', (table) => {
      table.uuid('usr_id').primary()
      table.text('usr_name').notNullable()
      table.text('usr_document').unique().notNullable()
      table.uuid('usr_session_id')
      table.timestamp('usr_created_at').defaultTo(knex.fn.now()).notNullable()
   })
}

export async function down(knex: Knex): Promise<void> {
   await knex.schema.dropTable('users')
}
