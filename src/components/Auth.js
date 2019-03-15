import React from 'react'
import { compose, withHandlers } from 'recompose'
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'

import LoginModal from './LoginModal'
import { Icon } from 'antd'
import { Button } from './Button'

const enhance = compose(
  withFirebase,
  withHandlers({
    logout: props => () => props.firebase.logout(),
    login: props => credentials =>
      props.firebase.login(credentials),
    register: props =>
      ({ email, password, ...profileData }) =>
        props.firebase.createUser(
          { email, password },
          profileData
        )
  })
)

const Auth = props => {
  if (!isLoaded(props.profile)) {
    return <div><Icon type='loading' spin/></div>
  }
  if (isEmpty(props.profile)) {
    return <div>
      <LoginModal onLogin={props.login} onRegister={props.register}/>
    </div>
  }
  return <div>
    <Button onClick={props.logout}>
      Logout
    </Button>
  </div>
}

export default enhance(Auth)