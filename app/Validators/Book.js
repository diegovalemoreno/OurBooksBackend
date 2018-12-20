'use strict'

const Antl = use('Antl')

class Book {
  get validateAll () {
    return true
  }
  get rules () {
    return {
      'title': 'required',
      'description': 'required',
      'type': 'required',
      'pagecount': 'required|integer',
      'point': 'required|integer',
      'book_cover_url': 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Book
