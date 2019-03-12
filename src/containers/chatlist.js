import { connect } from 'react-redux'
import Chats from '../components/chatlist'
import { chatAddBtnSettings } from '../defaults/messageTypesKeys'

const mapStateToProps = stage => ({
  chats: stage.chats,
  form: {
    ...stage.messageTypes.find(type => (type.scheme === chatAddBtnSettings.scheme)),
    format: chatAddBtnSettings.format
  }
})

const mapDispatchToProps = dispatch => ({})

const ChatsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chats)

export default ChatsContainer
