import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { css } from 'aphrodite/no-important'
import styles from './styles'
import PerfectScrollbar from 'react-perfect-scrollbar'
import MessageColorScheme from '../../../defaults/schemeColors/messageScheme'
import classNames from 'classnames/bind'

class ChatMessages extends Component {
  constructor(props, content) {
    super(props, content)

    this.timeId = null
    this.loadTimeId = null
    this.loading = false
    this.scrolledDown = true
    this.scrollbar = createRef()
    this.loadMoreCount = 10

    this.getScrollHeight = this.getScrollHeight.bind(this)
    this.onScrollUp = this.onScrollUp.bind(this)
    this.onYReachStart = this.onYReachStart.bind(this)
    this.onYReachEnd = this.onYReachEnd.bind(this)
    this.scrollToDown = this.scrollToDown.bind(this)
    this.firstScrolled = false

    this.state = {
      showItemsCount: 10,
    }
  }

  componentWillUnmount() {
    clearTimeout(this.loadTimeId)
  }

  onScrollUp() {
    this.scrolledDown = false
  }

  onYReachEnd() {
    this.scrolledDown = true
  }

  onYReachStart() {

    if(this.loadTimeId)
      clearTimeout(this.loadTimeId)

    this.loadTimeId = setTimeout(() => {
      const currentHeigth = this.getScrollHeight()
      if(!this.scrolledDown && !this.loading) {
        this.loading = true
        this.setState({showItemsCount: this.state.showItemsCount + this.loadMoreCount})
        setTimeout(() => {
          if(this.scrollbar.current)
            this.scrollbar.current._container.scrollTop = this.getScrollHeight() - currentHeigth
          this.loading = false
        })
      }
    })
  }

  getScrollHeight() {
    return this.scrollbar.current ? this.scrollbar.current._container.scrollHeight : 0
  }

  scrollToDown() {
    if(this.timeId)
      clearTimeout(this.timeId)

    this.timeId = setTimeout(() => {
      if(this.scrollbar.current) {
        this.scrollbar.current._container.scrollTop = this.getScrollHeight()
        this.firstScrolled = true
      }
      else {
        if(!this.firstScrolled) {
          this.timeId = setTimeout(() => {
            this.scrollToDown()
          }, 512)
        }
      }
    })
  }

  componentWillReceiveProps(props) {
    if(this.props.messages.length !== 0 && props.messages.length > this.state.showItemsCount && this.props.messages.length < props.messages.length) {
      let newItemsCount = props.messages.length - this.props.messages.length
      this.setState({showItemsCount: this.state.showItemsCount + (newItemsCount > this.loadMoreCount ? this.loadMoreCount : newItemsCount) })
    }

    this.scrollToDown()
  }

  renderItem(message) {
    if(!message) return ""
    const fromChat = message.from === this.props.chatId
    const colorScheme = (new MessageColorScheme(message.from)).getItemScheme()
    let itemStyles = {}

    if(fromChat) {
      itemStyles = { textAlign: 'right' }
    }

    return(
      <div style={itemStyles}>
        <div className={css(styles.item)}>
          <div className={css(styles.badge, (!fromChat) && styles.badgeLeft)}>
            <div className={classNames(css(styles.badgeBg), colorScheme.bg)}/>
            <div className={classNames(css(styles.message), colorScheme.text)}>
              {Object.keys(message).map(key => (key.charAt(0) !== '_' && message[key] && <div key={key}><strong>{key}:</strong> {message[key]}</div>))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={css(styles.main)}>
        <div className={css(styles.scrollbar)}>
          <PerfectScrollbar
            ref={this.scrollbar}
            onYReachEnd={this.onYReachEnd}
            onScrollUp={this.onScrollUp}
            onYReachStart={this.onYReachStart}
            suppressScrollX={true}
            className={css(styles.container)}
            contentClassName={css(styles.scrolContent)}
          >
            <div className={css(styles.scrolContent)}>
              {this.props.messages.slice(Math.max(this.props.messages.length - this.state.showItemsCount, 0)).map((msg, key) => (
                <div key={key}>{this.renderItem(msg.doc)}</div>
              ))}
            </div>
          </PerfectScrollbar>
        </div>
      </div>
    )
  }
}

ChatMessages.propTypes = {
  messages: PropTypes.array.isRequired,
  chatId: PropTypes.string.isRequired
}

export default ChatMessages
