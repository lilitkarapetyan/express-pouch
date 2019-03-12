import React from 'react'
import { css } from 'aphrodite/no-important';
import styles from './styles'
import { Row, Col } from 'reactstrap'
import Chat from '../../containers/chat'
import { chat as chatSizes } from '../../defaults/schemeSizes'

const Chatlist = ({ chats, form }) => {
  return (
    <Row>
      {chats.map((chat, key) => (chat &&
        <Col xs={chatSizes.xs} sm={chatSizes.sm} md={chatSizes.md} key={key}>
          <div className={css(styles.chatItem)}>
            <Chat chatId={chat.id} label={chat.label} form={form}/>
          </div>
        </Col>
      ))}
    </Row>
  )
}

export default Chatlist
