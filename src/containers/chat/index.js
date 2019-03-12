import { connect } from 'react-redux'
import Chat from '../../components/chat'
import { updateMessages } from '../../actions/messages'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => ({
  updateMessages: (messages, chatId) => {
    dispatch(updateMessages(messages, chatId))
  }
})

const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)

export default ChatContainer
