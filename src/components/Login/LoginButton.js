import React, { useReducer } from 'react'
import styled from 'styled-components'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { Button, Space, Modal, Form, message } from 'antd'
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

const TOGGLE_LOADING = 'TOGGLE_LOADING'
const TOGGLE_REGISTER = 'TOGGLE_REGISTER'
const TOGGLE_MODAL = 'TOGGLE_MODAL'
const RESET = 'RESET'

const defaultState = {
  isLoading: false,
  isRegistering: false,
  isModalVisible: false
}

function stateReducer(state, action) {
  const { type } = action

  switch (type) {
    case TOGGLE_LOADING: {
      return {
        ...state,
        isLoading: !state.isLoading
      }
    }

    case TOGGLE_REGISTER: {
      return {
        ...state,
        isRegistering: !state.isRegistering
      }
    }

    case TOGGLE_MODAL: {
      return {
        ...state,
        isModalVisible: !state.isModalVisible
      }
    }

    case RESET: {
      return {
        ...defaultState
      }
    }
  }
}

const ModalActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Auth = () => {
  const [state, dispatch] = useReducer(stateReducer, defaultState)

  const [loginForm] = Form.useForm()
  const [signupForm] = Form.useForm()
  const auth = getAuth()

  const onLoginWithEmailAndPassword = async ({ email, password }) => {
    try {
      dispatch({ type: TOGGLE_LOADING })
      await signInWithEmailAndPassword(auth, email, password)
      dispatch({ type: TOGGLE_MODAL })
      message.success('You are now logged in')
    } catch (error) {
      message.error('There was a problem logging you in')
    } finally {
      dispatch({ type: TOGGLE_LOADING })
    }
  }

  const onLoginWithGoogleProvider = async () => {
    try {
      dispatch({ type: TOGGLE_LOADING })
      await signInWithPopup(auth, new GoogleAuthProvider())
      dispatch({ type: TOGGLE_MODAL })
      message.success('You are now logged in')
    } catch (error) {
      message.error(error.message)
    } finally {
      dispatch({ type: TOGGLE_LOADING })
    }
  }

  const onSignup = async ({ email, password }) => {
    dispatch({ type: TOGGLE_LOADING })
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      message.success('You are now logged in')
    } catch (error) {
      message.error('There was a problem signing you up')
    } finally {
      dispatch({ type: TOGGLE_MODAL })
      dispatch({ type: TOGGLE_LOADING })
    }
  }

  const handleModalOk = () => {
    if (state.isRegistering) {
      signupForm.validateFields().then(onSignup)
    } else {
      loginForm.validateFields().then(onLoginWithEmailAndPassword)
    }
  }

  const getActionText = (isRegistering = state.isRegistering) => {
    return isRegistering ? 'Sign Up' : 'Log In'
  }

  const formProps = {
    colon: false,
    layout: 'vertical',
    requiredMark: false,
    preserve: false
  }

  function renderForm() {
    return state.isRegistering ? (
      <SignupForm
        formProps={{ ...formProps, onFinish: onSignup, form: signupForm, id: 'signup' }}
      />
    ) : (
      <LoginForm
        formProps={{
          ...formProps,
          onFinish: onLoginWithEmailAndPassword,
          form: loginForm,
          id: 'login'
        }}
        loginWithGoogleProvider={onLoginWithGoogleProvider}
      />
    )
  }

  function renderModalFooter() {
    return (
      <ModalActions>
        <Button
          type="text"
          onClick={() => dispatch({ type: TOGGLE_REGISTER })}
          icon={state.isRegistering ? <LoginOutlined /> : <UserAddOutlined />}>
          {getActionText(!state.isRegistering)}
        </Button>
        <div>
          <Button onClick={() => dispatch({ type: RESET })}>Cancel</Button>
          <Button
            loading={state.isLoading}
            type="primary"
            htmlType="submit"
            form={state.isRegistering ? 'signup' : 'login'}>
            {getActionText()}
          </Button>
        </div>
      </ModalActions>
    )
  }

  return (
    <Space>
      <Button type="primary" onClick={() => dispatch({ type: TOGGLE_MODAL })}>
        Login or Sign Up
      </Button>

      <Modal
        destroyOnClose
        visible={state.isModalVisible}
        title={getActionText()}
        footer={renderModalFooter()}
        onCancel={() => dispatch({ type: TOGGLE_MODAL })}
        onOk={handleModalOk}
        okText={getActionText()}>
        {renderForm()}
      </Modal>
    </Space>
  )
}

export default Auth
