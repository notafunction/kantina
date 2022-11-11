/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {
  Form,
  Input,
  Divider,
  Button,
  FormProps
} from 'antd'
import GoogleButton from 'react-google-button'
import Styled from './Styled'
import PasswordResetModal from './PasswordResetModal'

type Props = {
  formProps: FormProps
  loginWithGoogleProvider: () => void
}

const LoginForm: React.FunctionComponent<Props> = (
  props
) => {
  const [
    isPasswordResetModalVisible,
    setIsPasswordResetModalVisible
  ] = useState(false)

  return (
    <Form {...props.formProps}>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: "You'll need to enter your email"
          },
          {
            type: 'email',
            message: 'Please enter a valid email address'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "You'll need to enter your password"
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Divider>Or</Divider>
      <Styled.Providers>
        <GoogleButton
          label="Login with Google"
          onClick={props.loginWithGoogleProvider}
        />
      </Styled.Providers>

      <div className="flex flex-col items-center mt-4">
        <Button
          type="text"
          onClick={() =>
            setIsPasswordResetModalVisible(true)
          }
        >
          Forgot password?
        </Button>

        <PasswordResetModal
          visible={isPasswordResetModalVisible}
          close={() =>
            setIsPasswordResetModalVisible(false)
          }
        />
      </div>
    </Form>
  )
}

export default LoginForm
