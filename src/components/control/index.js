import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Button, ListGroup, ListGroupItem } from 'reactstrap'
import JSONEditor from '@json-editor/json-editor'
import loremIpsum from 'lorem-ipsum'
import { getGameControlChats } from '../../defaults/allowedChats'

import { css } from 'aphrodite/no-important'
import styles from './styles'

class ChatControll extends Component {
  constructor(props, content) {
    super(props, content)

    this.newMessageForm = this.newMessageForm.bind(this)
    this.closeMessageForm = this.closeMessageForm.bind(this)
    this.injectForm = this.injectForm.bind(this)
    this.generateMessages = this.generateMessages.bind(this)
    this.editor = null
    this.editorRef = React.createRef()

    this.state = {
      activeSchema: null,
      createChats: getGameControlChats()
    }
  }

  generateMessages(count) {
    this.props.createMessages(Array.apply(null, Array(count)).map(() => {
      const messageType = this.props.messageTypes[Math.floor(Math.random()*this.props.messageTypes.length)]
      return messageType.required.reduce((map, field) => {

        let value = ""
        const enumArr = messageType.properties[field].enum;
        if(Array.isArray(enumArr) && enumArr.length) {
          value = enumArr[Math.floor(Math.random()*enumArr.length)]
        }
        else if(messageType.properties[field].format === "color") {
          value = '#'+Math.floor(Math.random()*16777215).toString(16)
        }
        else {
          switch (messageType.properties[field].type) {
            case "integer":
              value = Math.floor(Math.random()*999)
              break;
            case "string":
              value = loremIpsum({count: 1})
              break;
            default:
              value = messageType.properties[field].default || loremIpsum({count: 1})
          }
        }

        map[field] = value
        return map
      }, {})
    }));
  }

  newMessageForm(e) {
    if(this.state.activeSchema !== e.target.name) {
      if(this.editor)
        this.editor.destroy()

      this.setState({activeSchema: e.target.name})
      let schema = this.props.messageTypes[e.target.name]
      schema.properties.from.enum = schema.properties.from.enum.sort((x, y) => (x === "white" ? -1 : y === "white" ? 1 : 0))

      this.editor = new JSONEditor(this.editorRef.current, {
        schema: schema,
        theme: 'bootstrap4'
      })
    }
    else
      this.closeMessageForm()
  }

  closeMessageForm() {
    this.editor.destroy()
    this.setState({activeSchema: null})
  }

  injectForm() {
    if(!(this.editor.validate()).length) {
      this.props.createMessages([this.editor.getValue()])
      this.closeMessageForm()
    }
  }

  render() {
    return (
      <div className={css(styles.main)}>
        <Row className="main">
          <Col md={4}>
            <Card>
              <CardHeader>Game Control</CardHeader>
              <CardBody>
                <p>Inject Messages:</p>
                <ListGroup>
                  {this.props.messageTypes.map((schema, key) => (
                    <ListGroupItem
                      key={key}
                      tag="button"
                      active={key === parseInt(this.state.activeSchema)}
                      onClick={this.newMessageForm}
                      name={key}
                    >
                      {schema.title}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </CardBody>
              {(!!this.state.createChats.length) && <CardBody>
                <p>Create chats:</p>
                <ListGroup>
                  {this.state.createChats.map((chat, key) => {
                    const active = this.props.chats.includes(chat.chatId)
                    return (
                      <ListGroupItem
                        key={key}
                        tag="button"
                        active={active}
                        onClick={() => {
                          if (active)
                            this.props.removeChat(chat.chatId)
                          else
                            this.props.createChat(chat)
                        }}
                      >
                        {chat.label}
                      </ListGroupItem>
                    )
                  })}
                </ListGroup>
              </CardBody>}
              <CardFooter>
                <Button block color="success" onClick={() => {this.generateMessages(50)}}>Generate 50 Messages</Button>
                <Button block color="success" onClick={() => {this.generateMessages(100)}}>Generate 100 Messages</Button>
                <Button block color="success" onClick={() => {this.generateMessages(1000)}}>Generate 1000 Messages</Button>
              </CardFooter>
              <CardFooter>
                <Button block color="danger" onClick={this.props.clearMessages}>Clear Messages</Button>
              </CardFooter>
            </Card>
          </Col>
          <Col md={8}>
            <div className={css(styles.createMessage, this.state.activeSchema && styles.createMessageShow)}>
              <Card>
                <CardBody>
                  <div ref={this.editorRef}/>
                </CardBody>
                <CardFooter>
                  <Button color="success" onClick={this.injectForm}>Inject</Button>
                </CardFooter>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

ChatControll.propTypes = {
  messageTypes: PropTypes.array,
  clearMessages: PropTypes.func.isRequired,
  createMessages: PropTypes.func.isRequired,
  createChat: PropTypes.func.isRequired,
  removeChat: PropTypes.func.isRequired,
  chats: PropTypes.array,
}

export default ChatControll
