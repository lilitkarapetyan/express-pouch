/*
 * action types
 */

export const ADD_CHAT = "ADD_CHAT"
export const REMOVE_CHAT = "REMOVE_CHAT"

/*
 * action creators
 */

export function createChat({chatId, label}) {
  return { type: ADD_CHAT, payload: { chat: { id: chatId, label: label } } }
}

export function removeChat(chatId) {
  return { type: REMOVE_CHAT, payload: chatId }
}
