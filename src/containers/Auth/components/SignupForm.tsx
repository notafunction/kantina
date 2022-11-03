/* eslint-disable no-unused-vars */
import React from 'react'
import { Form, FormProps, Input } from 'antd'

type Props = {
  formProps: FormProps
}

const SignupForm = (props) => {
  return (
    <Form {...props.formProps}>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Please enter your email' }]}>
        <Input type="email" name="email" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: 'Please enter a password' },
          { min: 6, message: 'Password must be at least 6 characters' }
        ]}>
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="passwordConfirm"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Please confirm your password' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) return Promise.resolve()
              return Promise.reject(new Error('Passwords do not match'))
            }
          })
        ]}>
        <Input.Password />
      </Form.Item>
    </Form>
  )
}

export default SignupForm
