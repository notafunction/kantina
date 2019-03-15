import React from 'react'
import { compose, withState, withHandlers } from 'recompose';

import { Alert, Button, Form, Input, Icon, Tooltip, message } from 'antd'

const enhance = compose(
  Form.create(),
  withState('loading', 'setLoading', false),
  withState('authError', 'setAuthError', null),
  withState('confirmDirty', 'setConfirmDirty', false),
  withHandlers({
    handleSubmit: (props) => (event) => {
      event.preventDefault()
      props.form.validateFields((err, { confirm, ...input}) => {
        if (!err) {
          props.setLoading(true)
          props.onSubmit(input)
          .then(() => {
            props.setLoading(false)
            message.success('You are now logged in!')
          })
          .catch((err) => {
            props.setLoading(false)
            props.setAuthError(err)
          })
        }
      })
    },
    handleConfirmBlur: (props) => ({ target }) => {
      props.setConfirmDirty(props.confirmDirty || !!target.value)
    },
    checkPassword: (props) => (rule, value, cb) => {
      if (value && value !== props.form.getFieldValue('password')) {
        cb('Passwords do not match')
      } else {
        cb()
      }
    },
    checkConfirm: (props) => (rule, value, cb) => {
      if (value && props.confirmDirty) {
        props.form.validateFields(['confirm'], { force: true })
      }
      cb()
    }
  })
)

const RegisterForm = (props) => {
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
          rules: [{ required: true, message: 'Please enter your email' }]
        })(<Input type='email' name='email' />)}
      </Form.Item>

      <Form.Item label='Password'>
        {getFieldDecorator('password', {
          rules: [
            { required: true, message: 'Please enter a password' },
            { min: 6, message: 'Password must be at least 6 characters' },
            { validator: props.checkConfirm },
          ]
        })(<Input type='password' name='password' />)}
      </Form.Item>

      <Form.Item label='Confirm Password'>
        {getFieldDecorator('confirm', {
          rules: [
            { required: true, message: 'Please confirm your password' },
            { validator: props.checkPassword }
          ]
        })(<Input type='password' onBlur={props.handleConfirmBlur} />)}
      </Form.Item>

      <Form.Item label={(
        <span>Username&nbsp;
            <Tooltip title='What do you want others to call you?'>
            <Icon type='question-circle-o' />
          </Tooltip>
        </span>
      )}>
        {getFieldDecorator('username', {
          rules: [
            { required: true, message: 'Please enter your name', whitespace: true }
          ]
        })(<Input name='username' />)}
      </Form.Item>

      <Button
        icon='left'
        type='ghost'
        onClick={props.toggleForm}
        disabled={props.loading}
      >
        Have An Account?
      </Button>

      <Button
        style={{ float: 'right' }}
        type='primary'
        htmlType='submit'
        onClick={props.handleSubmit}
        loading={props.loading}
      >
        Register
      </Button>

    </Form>
  )
}

export default enhance(RegisterForm)