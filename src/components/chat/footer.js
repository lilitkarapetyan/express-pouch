import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  CardFooter,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap'
import DraftForm from './form'


class ChatFooter extends Component {

  constructor(props, content) {
    super(props,content)

    this.renderDropdown = this.renderDropdown.bind(this)
    this.toggle = this.toggle.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.renderTabs = this.renderTabs.bind(this)

    this.showDropdownAfter = 3

    this.state = {
      activeDraft: props.messages.length - 1,
      dropdownOpen: false
    }
  }

  componentWillReceiveProps(props) {
    if(this.props.messages.length !== props.messages.length)
      this.toggle(props.messages.length - 1)
  }

  toggle(key) {
    this.setState({
      activeDraft: key,
    })
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  renderDropdown() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
        <DropdownToggle caret className={this.props.colorScheme.global.activeTab}>
          {this.props.messages[this.state.activeDraft].doc.title || `Draft ${this.state.activeDraft}`}
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.messages.map((data, key) => (
            <DropdownItem
              key={key}
              className={this.state.activeDraft === key ? this.props.colorScheme.global.activeTab : ""}
              onClick={() => { this.toggle(key)} }
            >
              {data.doc.title || `Draft ${key}`}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    )
  }

  renderTabs() {
    if(this.props.messages.length < 2)
      return <div/>

    return (
      <Nav tabs>
        {this.props.messages.map((data, key) => (
          <NavItem key={key}>
            <NavLink
              className={this.state.activeDraft === key ?
                this.props.colorScheme.global.activeTab :
                this.props.colorScheme.global.tab
              }
              onClick={() => { this.toggle(key)} }
            >
              {data.doc.title ? data.doc.title : `Draft ${key + 1}`}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    )
  }

  render() {
    return (
      <CardFooter className={this.props.colorScheme.global.footer}>
        {this.props.messages.length > 0 && <TabContent activeTab={this.state.activeDraft + ""}>
          {this.props.messages.length > this.showDropdownAfter ? this.renderDropdown() : this.renderTabs()}
          {this.props.messages.map((data, key) => (
            <TabPane key={key} tabId={key+""}>
              <DraftForm
                message={data.doc}
                button={this.props.button}
                form={this.props.form}
                saveDraft={this.props.saveDraft}
                sendDraftMessage={this.props.sendDraftMessage}
              />
            </TabPane>
          ))}
        </TabContent >}
      </CardFooter>
    )
  }
}

ChatFooter.propTypes = {
  saveDraft: PropTypes.func.isRequired,
  sendDraftMessage: PropTypes.func.isRequired,
  colorScheme: PropTypes.object.isRequired,
  chatId: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
}

export default ChatFooter
