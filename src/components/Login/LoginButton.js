import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import { Button, Space, Spin, Modal, Tabs, Form, message } from 'antd'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { useToggle } from '../../hooks'

const Auth = () => {
  const [loading, toggleLoading] = useToggle()
  const [authModalVisible, setAuthModalVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('login')
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
      toggleLoading()
      await firebase.login({ email, password })
      message.success('You are now logged in')
    } catch (error) {
      message.error('There was a problem logging you in')
    } finally {
      setAuthModalVisible(false)
      toggleLoading()
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
    toggleLoading()
    try {
      await firebase.createUser({ email, password })
      message.success('You are now logged in')
    } catch (error) {
      message.error('There was a problem signing you up')
    } finally {
      setAuthModalVisible(false)
      toggleLoading()
    }
  }

  const handleModalOk = () => {
    switch (activeTab) {
      case 'login':
        loginForm.validateFields().then(onLoginWithEmailAndPassword)
        break
      case 'signup':
        signupForm.validateFields().then(onSignup)
        break
    }
  }

  const formProps = {
    colon: false,
    layout: 'vertical',
    requiredMark: false,
    preserve: false
  }

  if (!isLoaded(auth)) return <Spin />

  return (
    <Space>
      {isEmpty(auth) ? (
        <Button type="primary" onClick={() => setAuthModalVisible(true)}>
          Login or Sign Up
        </Button>
      ) : (
        <Button onClick={onLogout}>Logout</Button>
      )}

      <Modal
        destroyOnClose
        closable={false}
        visible={authModalVisible}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setAuthModalVisible(false)
              setActiveTab('login')
            }}>
            Cancel
          </Button>,
          <Button loading={loading} type="primary" htmlType="submit" key="submit" form={activeTab}>
            {activeTab === 'login' ? 'Login' : 'Sign Up'}
          </Button>
        ]}
        onCancel={() => {
          setAuthModalVisible(false)
          setActiveTab('login')
        }}
        onOk={handleModalOk}
        okText={activeTab === 'login' ? 'Login' : 'Sign Up'}>
        <Tabs defaultActiveKey="login" onChange={(key) => setActiveTab(key)}>
          <Tabs.TabPane tab="Login" key="login">
            <LoginForm
              formProps={{
                ...formProps,
                onFinish: onLoginWithEmailAndPassword,
                form: loginForm,
                id: 'login'
              }}
              loginWithGoogleProvider={onLoginWithGoogleProvider}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Sign Up" key="signup">
            <SignupForm
              formProps={{ ...formProps, onFinish: onSignup, form: signupForm, id: 'signup' }}
            />
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    </Space>
  )
}

export default Auth
