'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Author extends Model {
  book () {
    return this.belongsTo('App/Models/book')
  }
}

module.exports = Author
