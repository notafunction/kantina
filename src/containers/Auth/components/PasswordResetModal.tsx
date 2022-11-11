import React from 'react'
import { Modal, Form, Input, message } from 'antd'
import {
  sendPasswordResetEmail,
  getAuth
} from 'firebase/auth'

type Props = {
  visible: boolean
  close: () => void
}

const PasswordResetModal: React.FunctionComponent<Props> = (
  props
) => {
  const [form] = Form.useForm()
  const auth = getAuth()

  const handleReset = async () => {
    const { email } = await form.validateFields()

    sendPasswordResetEmail(auth, email)

    message.success(
      'If the account exists, a password reset email has been sent'
    )
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
      okText="Send Reset"
    >
      <Form
        onFinish={handleReset}
        form={form}
        colon={false}
        layout="vertical"
        requiredMark={false}
        preserve={false}
      >
        <Form.Item
          name="email"
          label="Email Address"
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
      </Form>
    </Modal>
  )
}

export default PasswordResetModal
