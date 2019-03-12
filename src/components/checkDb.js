import React, { Component } from 'react'
import getDb from '../databases'
import { prefix, filters } from '../databases/filters'
import { views } from '../databases/views'

class CheckDb extends Component {
  constructor(props, content) {
    super(props, content)

    this.check = this.check.bind(this)
    this.messagesFiltersInitialized = false
    this.messagesViewsInitialized = false
    this.state = {
      done: false
    }
  }

  check() {
    if(this.messagesFiltersInitialized && this.messagesViewsInitialized) {
      this.setState({done: true})
    }
  }

  componentWillMount() {
    this.checkMessages()
  }

  checkMessages() {
    this.checkFilter(filters, prefix, Object.keys(filters))
    this.checkView(views, Object.keys(views))
  }

  checkFilter(filters, prefix, filterKeys, currentKey) {

    if(!currentKey) currentKey = 0
    if(!filterKeys.length || filterKeys.length <= currentKey) {
      this.messagesFiltersInitialized = true
      this.check()
      return false
    }

    const db = getDb(filterKeys[currentKey], {live: false})

    const docId = '_design/' + prefix + filterKeys[currentKey]

    db.get(docId).then(row => {
      let equal = true
      if(row.filters) {
        Object.keys(filters[filterKeys[currentKey]]).forEach(key => {
          if(!row.filters[key] || filters[filterKeys[currentKey]][key] !== row.filters[key])
            equal = false
        })
      }
      else equal = false

      if(equal) {
        this.checkFilter(filters, prefix, filterKeys, currentKey + 1)
      }
      else {
        console.log(`Updateing Filters ${docId}`)
        db.put({
          ...row,
          filters: filters[filterKeys[currentKey]]
        }).then(() => {
          console.log(`Updateing Filters ${docId} (success)`)
          this.checkFilter(filters, prefix, filterKeys, currentKey + 1)
        })
      }
    }).catch(({ status }) => {
      if(status === 404) {
        console.log(`Creating Filters ${docId}`)
        db.put({
          _id: docId,
          filters: filters[filterKeys[currentKey]]
        }).then(() => {
          console.log(`Creating Filters ${docId} (success)`)
          this.checkFilter(filters, prefix, filterKeys, currentKey + 1)
        })
      }
    })
  }

  checkView(views, viewKeys, currentKey) {
    if(!currentKey) currentKey = 0
    if(!viewKeys.length || viewKeys.length <= currentKey) {
      this.messagesViewsInitialized = true
      this.check()
      return false
    }

    const docId = '_design/' + viewKeys[currentKey]
    const db = getDb(viewKeys[currentKey], {live: false})

    db.get(docId).then(row => {
      let equal = true
      if(row.views) {
        Object.keys(views[viewKeys[currentKey]]).forEach(key => {
          if(!row.views[key] || views[viewKeys[currentKey]][key].map !== row.views[key].map)
            equal = false
        })
      }
      else equal = false

      if(equal) {
        this.checkView(views, viewKeys, currentKey + 1)
      }
      else {
        console.log(`Updateing Views ${docId}`)
        db.put({
          ...row,
          views: views[viewKeys[currentKey]]
        }).then(() => {
          console.log(`Updateing Views ${docId} (success)`)
          this.checkView(views, viewKeys, currentKey + 1)
        })
      }
    }).catch(({ status }) => {
      if(status === 404) {
        console.log(`Creating Views ${docId}`)
        db.put({
          _id: docId,
          views: views[viewKeys[currentKey]]
        }).then(() => {
          console.log(`Views Filters ${docId} (success)`)
          this.checkView(views, viewKeys, currentKey + 1)
        })
      }
    })
  }

  render() {
    return (<div>{this.state.done && this.props.children}</div>)
  }
}

export default CheckDb
