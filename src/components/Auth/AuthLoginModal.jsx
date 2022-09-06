/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Form, Input, Divider, Modal, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import GoogleButton from 'react-google-button'
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'

const StyledProviderLogins = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1rem;
`

const getAuthErrorMessage = (error) => {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'Email not found'
    default:
      return 'There was a problem signing you in. Try again later'
  }
}

const LoginForm = (props) => {
  const auth = getAuth()
  const [loading, setLoading] = useState(false)

  async function handleSubmit({ email, password }) {
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      props.close()
      message.success('You are now logged in')
    } catch (error) {
      message.error('There was a problem logging you in')
    } finally {
      setLoading(false)
    }
  }

  async function handleLoginWithProvider(provider) {
    try {
      await signInWithPopup(auth, provider)
      props.close()
    } catch (error) {
      message.error(error.message)
    }
  }

  function renderModalFooter() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <Button type="text" onClick={props.close} icon={<UserAddOutlined />}>
          Sign Up
        </Button>
        <div>
          <Button onClick={props.close}>Cancel</Button>
          <Button loading={loading} type="primary" htmlType="submit">
            Log In
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Modal
      destroyOnClose
      visible={props.open}
      title="Log In to Kantina"
      onOk={handleSubmit}
      okText="Log In"
      footer={renderModalFooter}>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "You'll need to enter your email" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "You'll need to enter your password" }]}>
          <Input.Password />
        </Form.Item>

        <Divider>Or</Divider>
        <StyledProviderLogins>
          <GoogleButton
            label="Login with Google"
            onClick={handleLoginWithProvider(new GoogleAuthProvider())}
          />
        </StyledProviderLogins>
      </Form>
    </Modal>
  )
}

LoginForm.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func
}

export default LoginForm
