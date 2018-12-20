'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AuthorSchema extends Schema {
  up () {
    this.create('authors', (table) => {
      table.increments()
      table
        .integer('book_id')
        .unsigned()
        .references('id')
        .inTable('books')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('surname').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('authors')
  }
}

module.exports = AuthorSchema
