'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')

const BookHook = exports = module.exports = {}

BookHook.sendNewBookAddEmail = async taskInstance => {
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) return

  const { email, username }  = await taskInstance.user().fetch()
  const { title } = taskInstance

  await Mail.send(
    ['emails.new_book'],
    { username, title },
    (message) => {
      message
        .to(email)
        .from('diegosvm@hotmail.com', 'Diego | OurBooks')
        .subject('Novo livro para você.')
    })
}
