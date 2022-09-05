/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, Input, Divider } from 'antd'
import PropTypes from 'prop-types'
import GoogleButton from 'react-google-button'

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
  return (
    <Form {...props.formProps}>
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
        <GoogleButton label="Login with Google" onClick={props.loginWithGoogleProvider} />
      </StyledProviderLogins>
    </Form>
  )
}

LoginForm.propTypes = {
  formProps: PropTypes.object,
  loginWithGoogleProvider: PropTypes.func.isRequired
}

export default LoginForm
