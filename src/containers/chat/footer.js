import { connect } from 'react-redux'
import Footer from '../../components/chat/footer'
import { sendDraftMessage, saveDraft } from '../../actions/messages'
import { chatAddBtnSettings } from '../../defaults/messageTypesKeys'


const mapStateToProps = (state, {chatId}) => ({
  messages: (state.messages && Array.isArray(state.messages[chatId])) ? state.messages[chatId].filter(msg => msg.doc.draft) : [],
  form: {
    ...state.messageTypes.find(type => (type.scheme === chatAddBtnSettings.scheme)),
    format: chatAddBtnSettings.format
  }
})

const mapDispatchToProps = dispatch => {

  return {
    sendDraftMessage: (message) => {
      dispatch(sendDraftMessage(message))
    },
    saveDraft: (message) => {
      dispatch(saveDraft(message))
    }
  }
}

const FooterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)

export default FooterContainer
