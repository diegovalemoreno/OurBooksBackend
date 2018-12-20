'use strict'

const Author = use('App/Models/Author')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with authors
 */
class AuthorController {
  /**
   * Show a list of all authors.
   * GET authors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ params }) {
    const author = await Author.query()
      .where('book_id', params.books_id)
      .with('book')
      .fetch()
    return author
  }


  /**
   * Create/save a new author.
   * POST authors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ params, request }) {
    const data = request.only([
      'book_id',
      'name',
      'surname'
    ])
    console.log(params)
    const author = await Author.create({ ...data, book_id: params.books_id })

    return author
  }

  /**
   * Display a single author.
   * GET authors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const author = await Author.findOrFail(params.id)

    return author
  }

  /**
   * Update author details.
   * PUT or PATCH authors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const author = await Author.findOrFail(params.id)
    const data = request.only([
      'book_id',
      'name',
      'surname'
    ])
    author.merge(data)

    await author.save()
  }

  /**
   * Delete a author with id.
   * DELETE authors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const author = await Author.findOrFail(params.id)

    await author.delete()
  }
}

module.exports = AuthorController
