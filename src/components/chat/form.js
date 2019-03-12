import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import JSONEditor from '@json-editor/json-editor'

class ChatForm extends Component {
  constructor(props, content) {
    super(props, content)

    this.initForm = this.initForm.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.getFormFilteredData = this.getFormFilteredData.bind(this)

    this.editor = null
    this.editorBox = React.createRef()
    this.hiddenAutofillKeys =  ["draft", "_id", "_rev", "from", "test"]
  }

  componentDidMount() {
    this.initForm()
  }

  componentWillReceiveProps(props) {
    if(this.editor)
      this.editor.setValue(this.getFormFilteredData(props.form, props.message).values)
  }

  getFormFilteredData(form, message) {
    let formFiltered = {
      ...form,
      required: ["_id", ...form.required],
      properties: {...form.properties}
    }
    let messageFiltered = {...message}

    this.hiddenAutofillKeys.forEach(key => {
      const requiredKey = formFiltered.required.indexOf(key)
      if(requiredKey > -1)
        formFiltered.required.splice(requiredKey, 1)

      if(formFiltered.properties[key])
        delete formFiltered.properties[key]

      if(messageFiltered[key])
        delete messageFiltered[key]
    })
    
    return {
      form: formFiltered,
      values: messageFiltered
    }
  }

  initForm() {
    const formData = this.getFormFilteredData(this.props.form, this.props.message)

    this.editor = new JSONEditor(this.editorBox.current, {
      schema: formData.form,
      theme: 'bootstrap4'
    }).setValue(formData.values)

    for(let key in this.editor.editors) {
      if(this.editor.editors.hasOwnProperty(key) && key !== 'root') {
        this.editor.watch(key, data => {
          this.props.saveDraft({
            ...this.props.message,
            ...this.editor.getValue(),
            [key.replace('root.', '')]: this.editor.getEditor(key).getValue()
          })
        })
      }
    }
  }

  submitForm() {
    if(!this.editor.validate().length)
      this.props.sendDraftMessage({
        ...this.props.message,
        ...this.editor.getValue(),
      })
  }

  render() {
    return (
      <div className="messageEdit">
        <div ref={this.editorBox}/>
        <Button onClick={this.submitForm}>{this.props.button}</Button>
      </div>
    )
  }
}

ChatForm.propTypes = {
  button: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  sendDraftMessage: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
}

export default ChatForm
