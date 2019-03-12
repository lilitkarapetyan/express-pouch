import { bg, buttons, text } from './theme'
import ColorScheme from './scheme'
import cn from 'classnames'

class ChatScheme extends ColorScheme {

  constructor(chatId) {
    super(chatId)

    this.items = {
      red: {
        bg: bg.red,
        text: text.white
      },
      blue: {
        bg: bg.blue,
        text: text.white
      }
    }

    this.itemDefault = {
      bg: bg.lightGray,
      text: text.black,
      btn: buttons.gray
    }

    this.global = {
      body: bg.white,
      footer: bg.light,
      tab: bg.white,
      activeTab: cn(bg.blue, text.white),
    }
  }
}

export default ChatScheme
