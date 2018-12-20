'use strict'

const Antl = use('Antl')

class Author {
  get validateAll () {
    return true
  }
  get rules () {
    return {
      'name': 'required',
      'surname': 'required',
      'book_id': 'required|integer'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Author
