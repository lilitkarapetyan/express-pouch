import { persistentReducer } from 'redux-pouchdb-rethink'
import getMessageTypes from '../defaults/messageTypes'
import getDb from '../databases'

const initialState = getMessageTypes()

const messageTypes = (state = initialState, action) => {

  switch (action.type) {
    default:
      return state
  }
}

const db = getDb('message-types')

export default persistentReducer(messageTypes, {db: db, name: "message-types"})
