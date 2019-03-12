import React, { Component } from 'react'
import { Card, CardBody } from 'reactstrap'
import PropTypes from 'prop-types'
import Messages from '../../containers/messages'
import ChatColorScheme from '../../defaults/schemeColors/chatScheme'
import getDb from '../../databases'
import { query } from '../../databases/views'
import { changes, prefix } from '../../databases/filters'

import Header from '../../containers/chat/header'
import Footer from '../../containers/chat/footer'

class Chat extends Component {
  constructor(props, content) {
    super(props, content)
    this.changeTimer = null
    this.changeTime = 128
    this.updateState = this.updateState.bind(this)
    this.db = getDb('messages')
    this.changes = changes(this.db, 'messages/' + props.chatId)

    this.state = {
      colorScheme: (new ChatColorScheme(props.chatId)).getScheme()
    }
  }

  componentWillMount() {
    this.updateState(() => {
      this.changes.on('change', () => {
        this.updateState()
      })
    })
  }

  componentWillReceiveProps(props) {
    if(this.props.chatId !== props.chatId) {
      this.changes.cancel()
      clearTimeout(this.changeTimer)
      this.changes = changes(this.db, 'messages/' + props.chatId).on('change', () => {
        this.updateState()
      })
      this.setState({colorScheme: (new ChatColorScheme(props.chatId)).getScheme()})
    }
  }

  componentWillUnmount() {
    this.changes.cancel()
    clearTimeout(this.changeTimer)
  }

  updateState = (f) => {
    if(this.changeTimer) clearTimeout(this.changeTimer)
    this.changeTimer = setTimeout(() => {
      query(this.db, 'messages/' + this.props.chatId, {
        include_docs: true,
        filter: prefix + 'messages/' + this.props.chatId
      }).then(({rows}) => {
        this.props.updateMessages(rows || [], this.props.chatId)
        if(typeof f === 'function') f()
      })
    }, this.changeTime)
  }

  render() {
    return (
      <Card>
        <Header colorScheme={this.state.colorScheme} button="Add >>" chatId={this.props.chatId}>{this.props.label}</Header>
        <CardBody className={this.state.colorScheme.global.body}>
          <Messages chatId={this.props.chatId}/>
        </CardBody>
        <Footer colorScheme={this.state.colorScheme} button="Send" chatId={this.props.chatId}/>
      </Card>
    )
  }
}

Chat.propTypes = {
  chatId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  updateMessages: PropTypes.func.isRequired
}

export default Chat
