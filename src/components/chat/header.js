import React from 'react'
import PropTypes from 'prop-types'

import { CardHeader, Button } from 'reactstrap'
import { css } from 'aphrodite/no-important'
import styles from './styles'

const ChatHeader = ({ colorScheme, button, children, chatId, defaultMessageType, createDraft }) => {

  const headerButtonOnClick = () => {
    let message = {}
    
    defaultMessageType.required.forEach(field => {
      let value = ""

      const enumArr = defaultMessageType.properties[field].enum;

      if(Array.isArray(enumArr) && enumArr.length) {
        if(field === 'from' && enumArr.includes(chatId))
          value = chatId
        else if(defaultMessageType.properties[field].default)
          value = defaultMessageType.properties[field].default
        else
          value = enumArr[0]
      }
      else if(defaultMessageType.properties[field].default) {
        value = defaultMessageType.properties[field].default
      }

      message[field] = value
    })

    createDraft(message)
  }

  return (
    <CardHeader className={colorScheme.item.bg}>
      <div className={css(styles.labelContainer)}>
        <div className={css(styles.label)}>
          <Button color="link" className={css(styles.labelButton)}>
            <strong className={colorScheme.item.text}>{children}</strong>
          </Button>
        </div>
      </div>
      {button && defaultMessageType && <Button color={colorScheme.item.btn} onClick={headerButtonOnClick}>{button}</Button>}
    </CardHeader>
  )
}

ChatHeader.propTypes = {
  createDraft: PropTypes.func.isRequired,
  colorScheme: PropTypes.object.isRequired,
  defaultMessageType: PropTypes.object.isRequired,
  chatId: PropTypes.string.isRequired,
  children: PropTypes.string,
  button: PropTypes.string
}

ChatHeader.defaultValues = {
  button: "",
  children: ""
}

export default ChatHeader
