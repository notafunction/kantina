import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, message } from 'antd'
import { sendPasswordResetEmail, getAuth } from 'firebase/auth'

const PasswordResetModal = (props) => {
  const [form] = Form.useForm()
  const auth = getAuth()

  const handleReset = async () => {
    const { email } = await form.validateFields()

    sendPasswordResetEmail(auth, email)

    message.success('If the account exists, a password reset email has been sent')
    props.close()
  }

  return (
    <Modal
      centered
      destroyOnClose
      open={props.visible}
      title="Reset Password"
      onCancel={props.close}
      onOk={handleReset}
      okText="Send Reset">
      <Form
        onFinish={handleReset}
        form={form}
        colon={false}
        layout="vertical"
        requiredMark={false}
        preserve={false}>
        <Form.Item
          name="email"
          label="Email Address"
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
      </Form>
    </Modal>
  )
}

PasswordResetModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default PasswordResetModal
