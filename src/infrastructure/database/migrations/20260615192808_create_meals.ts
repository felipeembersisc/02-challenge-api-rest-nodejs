import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
   await knex.schema.createTable('meals', (table) => {
      table.uuid('mea_id').primary()
      table.uuid('mea_user_id').notNullable().references('usr_id').inTable('users')
      table.string('mea_name').notNullable()
      table.string('mea_description')
      table.date('mea_date').notNullable()
      table.time('mea_time').notNullable()
      table.boolean('mea_in_diet').notNullable().defaultTo(true)
      table.timestamp('mea_created_at').defaultTo(knex.fn.now()).notNullable()
      table.timestamp('mea_updated_at')
   })
}

export async function down(knex: Knex): Promise<void> {
   await knex.schema.dropTable('meals')
}
