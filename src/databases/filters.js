import chats from '../defaults/allowedChats'
/* pouchdb filter management
 */

 // declare the messages filters
let messages = {}
chats.forEach(({chatId}) => {
  messages[chatId] = (doc => ((doc.to === "chatId" && doc.draft === false) || doc.from === "chatId"))
                    .toString()
                    .replace(new RegExp("chatId", 'g'), chatId)
})

// declare the filters
export const filters = {
  messages: messages
}

export const prefix = 'filter'

// query couchdb filters
export const changes = (db, filter, params) => {
  return db.changes({
    since: 'now',
    live: true,
    include_docs: true,
    filter: prefix + filter
  })
}

export default filters
