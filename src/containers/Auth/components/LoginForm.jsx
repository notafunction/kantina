/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, Input, Divider, Button } from 'antd'
import PropTypes from 'prop-types'
import GoogleButton from 'react-google-button'
import Styled from './Styled'
import PasswordResetModal from './PasswordResetModal'

const LoginForm = (props) => {
  const [isPasswordResetModalVisible, setIsPasswordResetModalVisible] = useState(false)

  return (
    <Form {...props.formProps}>
      <Form.Item
        name="email"
        label="Email"
        type="email"
        rules={[
          { required: true, message: "You'll need to enter your email" },
          {
            type: 'email',
            message: 'Please enter a valid email address'
          }
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "You'll need to enter your password" }]}>
        <Input.Password />
      </Form.Item>

      <Divider>Or</Divider>
      <Styled.Providers>
        <GoogleButton label="Login with Google" onClick={props.loginWithGoogleProvider} />
      </Styled.Providers>

      <div className="flex flex-col items-center mt-4">
        <Button type="text" onClick={() => setIsPasswordResetModalVisible(true)}>
          Forgot password?
        </Button>

        <PasswordResetModal
          visible={isPasswordResetModalVisible}
          close={() => setIsPasswordResetModalVisible(false)}
        />
      </div>
    </Form>
  )
}

LoginForm.propTypes = {
  formProps: PropTypes.object,
  loginWithGoogleProvider: PropTypes.func.isRequired
}

export default LoginForm
