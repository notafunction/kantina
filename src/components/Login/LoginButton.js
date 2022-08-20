import React, { useReducer } from 'react'
import { useSelector } from 'react-redux'
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import { Button, Space, Spin, Modal, Form, message } from 'antd'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

const TOGGLE_LOADING = 'TOGGLE_LOADING'
const TOGGLE_REGISTER = 'TOGGLE_REGISTER'
const TOGGLE_MODAL = 'TOGGLE_MODAL'

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
  }
}

const Auth = () => {
  const [state, dispatch] = useReducer(stateReducer, {
    isLoading: false,
    isRegistering: false,
    isModalVisible: false
  })

  const [loginForm] = Form.useForm()
  const [signupForm] = Form.useForm()
  const firebase = useFirebase()
  const auth = useSelector(({ firebase }) => firebase.auth)

  const onLogout = async () => {
    try {
      await firebase.auth().signOut()
      message.success('You are now logged out')
    } catch (error) {
      message.error('There was a problem :(')
    }
  }

  const onLoginWithEmailAndPassword = async ({ email, password }) => {
    try {
      dispatch({ type: TOGGLE_LOADING })
      await firebase.login({ email, password })
      message.success('You are now logged in')
    } catch (error) {
      message.error('There was a problem logging you in')
    } finally {
      dispatch({ type: TOGGLE_MODAL })
      dispatch({ type: TOGGLE_LOADING })
    }
  }

  const onLoginWithGoogleProvider = async () => {
    try {
      await firebase.login({ provider: 'google', type: 'popup' })
      message.success('You are now logged in')
    } catch (error) {
      console.error(error)
    }
  }

  const onSignup = async ({ email, password }) => {
    dispatch({ type: TOGGLE_LOADING })
    try {
      await firebase.createUser({ email, password })
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

  const getActionText = () => {
    return state.isRegistering ? 'Sign Up' : 'Log In'
  }

  const formProps = {
    colon: false,
    layout: 'vertical',
    requiredMark: false,
    preserve: false
  }

  const renderForm = () => {
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

  if (!isLoaded(auth)) return <Spin />

  return (
    <Space>
      {isEmpty(auth) ? (
        <Button type="primary" onClick={() => dispatch({ type: TOGGLE_MODAL })}>
          Login or Sign Up
        </Button>
      ) : (
        <Button onClick={onLogout}>Logout</Button>
      )}

      <Modal
        destroyOnClose
        closable={false}
        visible={state.isModalVisible}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              dispatch({ type: TOGGLE_MODAL })
              state.isRegistering && dispatch({ type: TOGGLE_REGISTER })
            }}>
            Cancel
          </Button>,
          <Button
            loading={state.isLoading}
            type="primary"
            htmlType="submit"
            key="submit"
            form={state.isRegistering ? 'signup' : 'login'}>
            {state.isRegistering ? 'Sign Up' : 'Login'}
          </Button>
        ]}
        onCancel={() => {
          dispatch({ type: TOGGLE_MODAL })
          state.isRegistering && dispatch({ type: TOGGLE_REGISTER })
        }}
        onOk={handleModalOk}
        okText={getActionText()}>
        {renderForm()}
      </Modal>
    </Space>
  )
}

export default Auth
