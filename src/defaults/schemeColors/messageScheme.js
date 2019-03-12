import { bg, text } from './theme'
import ColorScheme from './scheme'

class MessageScheme extends ColorScheme {

  constructor(chatId) {
    super(chatId)

    this.items = {
      red: {
        bg: bg.red,
      },
      blue: {
        bg: bg.blue,
      }
    }

    this.itemDefault = {
      bg: bg.gray,
      text: text.white,
    }
  }
}

export default MessageScheme
