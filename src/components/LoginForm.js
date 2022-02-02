/* eslint-disable no-unused-vars */
import React from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'

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
    </Form>
  )
}

LoginForm.propTypes = {
  formProps: PropTypes.object
}

export default LoginForm
