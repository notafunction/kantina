import React from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import { useDatabase } from 'reactfire'
import {
  ref,
  set,
  query,
  orderByChild,
  equalTo,
  limitToFirst,
  get
} from 'firebase/database'
import { useParams } from 'react-router'

type Props = {
  visible: boolean
  close: () => void
}

const AddMemberModal: React.FunctionComponent<Props> = (
  props
) => {
  const params = useParams()
  const db = useDatabase()
  const [form] = Form.useForm()

  const onOk = async () => {
    const { email, role } = await form.validateFields()

    const userQuery = query(
      ref(db, 'users'),
      orderByChild('email'),
      equalTo(email),
      limitToFirst(1)
    )
    const userSnap = await get(userQuery)

    if (userSnap.exists()) {
      const [uid] = Object.keys(userSnap.val())
      set(
        ref(db, `boards/${params.boardId}/members/${uid}`),
        { role }
      )
      set(
        ref(db, `users/${uid}/boards/${params.boardId}`),
        { role }
      )

      form.resetFields()
      props.close()
    } else {
      message.error('That user does not exits')
    }
  }

  const onCancel = () => {
    form.resetFields()
    props.close()
  }

  return (
    <Modal
      centered
      title="Add Member"
      open={props.visible}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form
        layout="vertical"
        requiredMark={false}
        onFinish={onOk}
        form={form}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter an email address'
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
          name="role"
          label="Role"
          initialValue="viewer"
        >
          <Select>
            <Select.Option value="admin">
              Admin
            </Select.Option>
            <Select.Option value="editor">
              Editor
            </Select.Option>
            <Select.Option value="viewer">
              Viewer
            </Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddMemberModal
