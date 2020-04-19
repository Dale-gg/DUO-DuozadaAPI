import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('user', (table: Knex.TableBuilder) => {
        table.string('id').primary
        table.string('name').notNullable
        table.string('email').notNullable
        table.string('password').notNullable
        table.string('avatar_url').notNullable
        table.string('champions').notNullable
        table.string('routes').notNullable
        table.string('like')
        table.string('dislike')
        table.string('media')
        table.string('bio')
        table.boolean('status').defaultTo(0)
        table.timestamps(true, true)
    })
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('user')
}