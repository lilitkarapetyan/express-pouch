import { connect } from 'react-redux'
import { createMessages, removeAllMessages } from '../actions/messages'
import { createChat, removeChat } from '../actions/chats'
import { showOnGameControl } from '../defaults/messageTypesKeys'

import Control from '../components/control'

const mapStateToProps = state => ({
  messageTypes: state.messageTypes.filter(type => (showOnGameControl.includes(type.scheme))),
  chats: state.chats.map((chat) => chat && chat.id)
})

const mapDispatchToProps = dispatch => {

  return {
    createMessages: (messages) => {
      dispatch(createMessages(messages))
    },
    clearMessages: () => {
      dispatch(removeAllMessages())
    },
    createChat: (chat) => {
      dispatch(createChat(chat))
    },
    removeChat: (id) => {
      dispatch(removeChat(id))
    }
  }
}

const ControlContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Control)

export default ControlContainer
