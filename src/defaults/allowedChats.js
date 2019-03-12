const defaultOptions = {
  showOnGameControlCreateChats: true,
  addChatIdToChatFromArray: true,
  addChatIdToChatToArray: true,
  preFillFrom: false
}

const chats = [
  {
    chatId: "red",
    label:"Red Chat",
    options: {
      ...defaultOptions
    }
  },
  {
    chatId: "blue",
    label:"Blue Chat",
    options: {
      ...defaultOptions
    }
  },
  {
    chatId: "white",
    label:"White Chat",
    options: {
      ...defaultOptions,
      addChatIdToChatToArray: false,
      preFillFrom: true
    }
  }
]

export const getToKeys = () => {
  return chats
          .filter(chat => chat.options.addChatIdToChatToArray)
          .map(chat => chat.chatId)
}
export const getFromKeys = () => {
  return chats
          .filter(chat => chat.options.addChatIdToChatFromArray)
          .map(chat => chat.chatId)
}

export const getGameControlChats = () => {
  return chats
          .filter(chat => chat.options.showOnGameControlCreateChats)
}

export default chats
