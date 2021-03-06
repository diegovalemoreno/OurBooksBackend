'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.get('books/user/:email','BookController.userBooks')
Route.get('books/:isbn','BookController.finfBooksByISBN')
Route.post('sessions', 'SessionController.store').validator('Session')
Route.post('passwords', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('passwords', 'ForgotPasswordController.update').validator('ResetPassword')

Route.group(() => {
  Route.resource('books', 'BookController').apiOnly()
    .validator(new Map([
      [['books.store'], ['Book']]
    ]))
  // Route.resource('books.authors', 'AuthorController').apiOnly()
  //   .validator(new Map([
  //     [['author.store'], ['Author']]
  //   ]))
}).middleware(['auth'])
Route.get('/', () => {
  return { greeting: 'Bem vindo Diego Moreno!!!' }
})
