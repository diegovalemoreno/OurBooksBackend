'use strict'

const Book = use('App/Models/Book')
const User = use('App/Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with books
 */
class BookController {
  /**
   * Show a list of all books.
   * GET books
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request }) {
    const { page } = request.get()
    const books = await Book.query()
      .with('user')
      .paginate(page)

    return books
  }

  /**
   * Create/save a new book.
   * POST books
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const data = request.only([
      'user_id',
      'title',
      'description',
      'type',
      'pagecount',
      'point',
      'book_cover_url'
    ])
    const book = await Book.create({ ...data })

    const authors = request.input('authors')

    await book.authors().createMany(authors)
    return book
  }

  /**
   * Display a single book.
   * GET books/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({
    params,
    response
  }) {
    try {
      const books = await Book.findOrFail(params.id)

      await books.load('authors')
      await books.load('user')
      return books
    } catch (error) {
      return response.status(error.status).send(error.messages)
    }
  }

  /**
   * Display a single book.
   * GET books/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async userBooks ({
    params
  }) {
    // const user = await User.findOrFail(params.id)
    const users = await User
      .query()
      .with('books')
      .with('books.authors')
      .where('id', params.id)
      .fetch()

    return users
  }

  /**
   * Update book details.
   * PUT or PATCH books/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({
    params,
    request,
    response
  }) {
    try {
      const book = await Book.findOrFail(params.id)
      const data = request.only([
        'user_id',
        'title',
        'description',
        'type',
        'pagecount',
        'point',
        'book_cover_url'
      ])
      book.merge(data)

      await book.save()

      return book
    } catch (error) {
      return response.status(error.status).send(error.messages)
    }
  }

  /**
   * Delete a book with id.
   * DELETE books/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({
    params,
    response
  }) {
    try {
      const book = await Book.findOrFail(params.id)
      console.log(book)
      await book.delete()
    } catch (error) {
      return response.status(error.status).send(error.messages)
    }
  }
}

module.exports = BookController
