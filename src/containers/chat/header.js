import { connect } from 'react-redux'
import Header from '../../components/chat/header'
import { saveDraft } from '../../actions/messages'
import { chatAddBtnSettings } from '../../defaults/messageTypesKeys'

const mapStateToProps = (state) => ({
  defaultMessageType: state.messageTypes.find(type => (type.scheme === chatAddBtnSettings.scheme))
})

const mapDispatchToProps = dispatch => {

  return {
    createDraft: (message) => {
      dispatch(saveDraft(message))
    }
  }
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer
