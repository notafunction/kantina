import React, { useReducer } from 'react'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { ref, update } from 'firebase/database'
import { useDatabase } from 'reactfire'
import { Button, Space, Modal, Form, message } from 'antd'
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Styled from './components/Styled'
import authErrorMessageMap from './components/authErrorMessageMap'

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

const Auth = () => {
  const [state, dispatch] = useReducer(stateReducer, defaultState)

  const [loginForm] = Form.useForm()
  const [signupForm] = Form.useForm()
  const auth = getAuth()
  const db = useDatabase()

  const populateProfile = async (user) => {
    const userRef = ref(db, `users/${user.uid}`)

    return await update(userRef, {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    })
  }

  const onLoginWithEmailAndPassword = async ({ email, password }) => {
    try {
      dispatch({ type: TOGGLE_LOADING })

      const { user } = await signInWithEmailAndPassword(auth, email, password)
      await populateProfile(user)

      dispatch({ type: TOGGLE_MODAL })
      message.success('You are now logged in')
    } catch (error) {
      message.error(authErrorMessageMap[error.code])
    } finally {
      dispatch({ type: TOGGLE_LOADING })
    }
  }

  const onLoginWithGoogleProvider = async () => {
    try {
      dispatch({ type: TOGGLE_LOADING })

      const { user } = await signInWithPopup(auth, new GoogleAuthProvider())
      await populateProfile(user)

      dispatch({ type: TOGGLE_MODAL })
      message.success('You are now logged in')
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user') {
        message.error(authErrorMessageMap[error.code])
      }
    } finally {
      dispatch({ type: TOGGLE_LOADING })
    }
  }

  const onSignup = async ({ email, password }) => {
    dispatch({ type: TOGGLE_LOADING })

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await populateProfile(user)

      message.success('You are now logged in')
      dispatch({ type: TOGGLE_MODAL })
    } catch (error) {
      console.dir(error)
      message.error(authErrorMessageMap[error.code])
    } finally {
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
      <Styled.ModalActions>
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
      </Styled.ModalActions>
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
