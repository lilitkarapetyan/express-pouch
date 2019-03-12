import React from 'react'
import { css } from 'aphrodite/no-important';
import styles from './styles'
import { Container } from 'reactstrap'
import Control from '../../containers/control'
import Chats from '../../containers/chatlist'

const Homepage = () => {
  return (
    <Container fluid>
      <div className={css(styles.main)}>
        <Chats/>
        <Control/>
      </div>
    </Container>
  )
}

export default Homepage
