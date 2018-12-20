'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Book extends Model {
  static boot () {
    super.boot()

    this.addHook('afterCreate' ,'BookHook.sendNewBookAddEmail')
    this.addHook('beforeUpdate', 'BookHook.sendNewBookAddEmail')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  authors () {
    return this.hasMany('App/Models/Author')
  }
}

module.exports = Book
