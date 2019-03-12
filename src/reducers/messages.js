import getDb from '../databases'
import { SAVE_DRAFT, PUSH_MESSAGES, REMOVE_ALL_MESSAGES, UPDATE_MESSAGES, SEND_DRAFT_MESSAGE } from '../actions/messages'

export const db = getDb('messages')
let initialState = {}

const messages = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case PUSH_MESSAGES:
      let messages = initAdditionalAttributes(action.payload.messages)
      if(messages.length === 1)
        db.put(messages[0])
      else {
        db.bulkDocs(messages)
      }
      return state
    case REMOVE_ALL_MESSAGES:
      db.allDocs().then(result => {
        return Promise.all(result.rows.map(row => {
          if(row.id.search("_design") === -1) {
            return db.remove(row.id, row.value.rev)
          }
          return false
        }));
      })
      return {}
    case UPDATE_MESSAGES:
      return {
        ...state,
        [action.payload.chatId]: action.payload.messages
      }
    case SAVE_DRAFT:
      let message = {
        ...(initAdditionalAttributes([action.payload.message])[0]),
        draft: true
      }

      if(action.payload.message._id)
        message._id = action.payload.message._id

      if(action.payload.message._rev)
        message._rev = action.payload.message._rev

      db.put(message)

      return state
    case SEND_DRAFT_MESSAGE:
      db.get(action.payload.message._id).then(row => {
        db.bulkDocs([
          {...initAdditionalAttributes([action.payload.message])[0], _rev: ""},
          {...row, _deleted: true}
        ])
      })
      return state
    default:
      return state
  }
}

const getId = (key) => {
  return new Date().toISOString() + "-" + (key || '0')
}

const initAdditionalAttributes = (messages) => {
  return messages.map((message, key) => {
    return {
      ...message,
      _id: getId(key),
      draft: false
    }
  })
}

export default messages
