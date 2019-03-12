import chats from '../defaults/allowedChats'
const emit = () => {}

// declare the messages views
let messages = {}
chats.forEach(({chatId}) => {
  messages[chatId] = {
    map: (doc => {
      if((doc.to === "chatId" && doc.draft === false) || doc.from === "chatId")
        emit(doc.id)
    }).toString().replace(new RegExp("chatId", 'g'), chatId)
  }
})

// declare the views
export const views = {
  messages: messages
}

// query couchdb views
export const query = (db, view, params) => {
  const namespace = view.split('/')[0]

  return db.query(view, params).catch(err => {
    if (!views[namespace]) throw new Error('View ' + namespace + ' is not defined.')

    // if view doesn't exist, create it, and try again
    if (err.status === 404) {
      return db.put({
        _id: '_design/' + namespace,
        views: views[namespace]
      }).then(() => (query(db, view, params)))
    }
  })
}

export default views
