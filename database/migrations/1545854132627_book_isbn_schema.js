'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BookIsbnSchema extends Schema {
  up () {
    this.alter('books', (table) => {
      table.string('isbn')
    })
  }

  down () {
    this.drop('book_isbns')
  }
}

module.exports = BookIsbnSchema
