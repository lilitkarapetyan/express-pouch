import { persistentReducer } from 'redux-pouchdb-rethink'
import getDb from '../databases'
import { ADD_CHAT, REMOVE_CHAT } from '../actions/chats'

const initialState = []

const chats = (state = initialState, action) => {

  switch (action.type) {
    case ADD_CHAT:
      return [...state, action.payload.chat]
    case REMOVE_CHAT:
      return state.filter(chat => chat.id !== action.payload)
    default:
      return state
  }
}

const db = getDb('chats')

export default persistentReducer(chats, {db: db, name: "chats"})
