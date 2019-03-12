import { combineReducers } from 'redux'
import chats from './chats'
import messageTypes from './messageTypes'
import messages from './messages'

export default combineReducers({
  chats,
  messageTypes,
  messages
})
