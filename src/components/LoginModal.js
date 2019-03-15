import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers, withState } from 'recompose'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { Button } from './Button'
import { Modal } from 'antd'

const enhance = compose(
  withState('visible', 'setVisible', false),
  withState('register', 'setRegister', false),
  withHandlers({
    toggleVisible: (props) => () => props.setVisible(!props.visible),
    toggleRegister: (props) => () => props.setRegister(!props.register),
    handleLogin: (props) =>
      (payload) => props.onLogin(payload),
    handleRegister: (props) =>
      (payload) => props.onRegister(payload),
  })
)

const LoginModal = (props) => [
  <Button
    key='1'
    onClick={props.toggleVisible}
    loading={props.loading}
  >
    Login
  </Button>,
  <Modal
    key='2'
    title={props.register ? 'Register' : 'Login'}
    visible={props.visible}
    footer={null}
    onCancel={props.toggleVisible}
  >
    {
      !props.register
      ? <LoginForm onSubmit={props.handleLogin} toggleForm={props.toggleRegister} />
      : <RegisterForm onSubmit={props.handleRegister} toggleForm={props.toggleRegister} />
    }
  </Modal>
]

LoginModal.propTypes = {
  onLogin: PropTypes.func.isRequired,
}


export default enhance(LoginModal)