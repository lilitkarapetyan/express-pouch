import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Homepage from './homepage'
import CheckDb from './checkDb'

const Root = ({ store }) => (
  <Provider store={store}>
    <CheckDb>
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
        </Switch>
      </Router>
    </CheckDb>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
