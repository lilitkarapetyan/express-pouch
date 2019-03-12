/*
 * action types
 */

export const PUSH_MESSAGES = "PUSH_MESSAGES"
export const REMOVE_ALL_MESSAGES = "REMOVE_ALL_MESSAGES"
export const GENERATE_RANDOM_MESSAGES = "PUSH_MESSAGES"
export const UPDATE_MESSAGES = "UPDATE_MESSAGES"
export const SAVE_DRAFT = "SAVE_DRAFT"
export const SEND_DRAFT_MESSAGE = "SEND_DRAFT_MESSAGE"

/*
 * action creators
 */

export function sendDraftMessage(draftMessage) {
  return { type: SEND_DRAFT_MESSAGE, payload: { message: draftMessage } }
}

export function saveDraft(draftMessage) {
  return { type: SAVE_DRAFT, payload: { message: draftMessage } }
}

export function createMessages(messages) {
  return { type: PUSH_MESSAGES, payload: { messages: messages } }
}

export function removeAllMessages() {
  return { type: REMOVE_ALL_MESSAGES }
}

export function updateMessages(messages, chatId) {
  return { type: UPDATE_MESSAGES, payload: { messages: messages, chatId: chatId} }
}
