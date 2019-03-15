import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers, withState } from 'recompose'

import { Alert, Form, Icon, Input, Button, Checkbox } from 'antd'

const enhance = compose(
  Form.create(),
  withState('loading', 'setLoading', false),
  withState('authError', 'setAuthError', null),
  withHandlers({
    handleSubmit: (props) => (event) => {
      event.preventDefault()
      props.form.validateFields((err, input) => {
        if (!err) {
          props.setLoading(true)
          props.setAuthError(null)
          props.onSubmit(input)
          .then(() => props.setLoading(false))
          .catch((err) => {
            props.setLoading(false)
            props.setAuthError(err)
          })
        }
      })
    },
  })
)

const LoginForm = (props) => {
  const { getFieldDecorator } = props.form
  return (
    <Form
      hideRequiredMark
      onSubmit={props.handleSubmit}
    >
      {
        // Show any returned error message from auth
        props.authError &&
        <Alert
          type='error'
          message={props.authError.message}
        />
      }

      <Form.Item label='Email'>
        {getFieldDecorator('email', {
          rules: [{ required: true, message: 'Please enter your email!'}]
        })(
          <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder='Email' />
        )}
      </Form.Item>
      <Form.Item label='Password'>
        {getFieldDecorator('password', {
          rules: [
            { required: true, message: 'Please enter your password!' },         
          ]
        })(
          <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Password' />
        )}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(
          <Checkbox>Remember me</Checkbox>
        )}

        <a style={{ float: 'right' }}>Forgot password</a>
      </Form.Item>

        <Button
          type='ghost'
          disabled={props.loading}
          onClick={props.toggleForm}
        >
          Register
        </Button>

        <Button
          style={{ float: 'right' }}
          type='primary'
          htmlType="submit"
          loading={props.loading}
        >
          Log In
        </Button>

    </Form>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default enhance(LoginForm)