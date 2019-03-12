import { connect } from 'react-redux'
import Messages from '../components/chat/messages'

const mapStateToProps = (state, { chatId }) => {
  return {
    messages: (state.messages && Array.isArray(state.messages[chatId])) ? state.messages[chatId] : [],
    chatId: chatId
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const MessagesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)

export default MessagesContainer
