import React from 'react'
import { Modal, Form, Input, Select, Switch, message } from 'antd'
import { LockOutlined, UnlockOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { useDatabase, useUser } from 'reactfire'
import { push, ref, set } from 'firebase/database'

const CreateBoardModal = (props) => {
  const db = useDatabase()
  const user = useUser()
  const [form] = Form.useForm()

  const onCreateBoard = async (values) => {
    try {
      const boardRef = await push(ref(db, 'boards'))

      set(boardRef, {
        ...values,
        id: boardRef.key,
        members: {
          [user.data.uid]: true
        }
      })

      set(ref(db, `users/${user.data.uid}/boards`), {
        [boardRef.key]: true
      })
    } catch (error) {
      message.error(error)
    }
  }

  const onOk = async () => {
    const values = await form.validateFields()
    await onCreateBoard(values)
    form.resetFields()
    props.close()
  }

  const onCancel = () => {
    form.resetFields()
    props.close()
  }

  return (
    <Modal key="2" title="Create Board" visible={props.visible} onCancel={onCancel} onOk={onOk}>
      <Form layout="vertical" requiredMark={false} onFinish={onOk} form={form}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter a title' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Type" initialValue="public">
          <Select>
            <Select.Option value="private">Private</Select.Option>
            <Select.Option value="public">Public</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="locked"
          label="Lock"
          help="Allow changes only by board admins"
          valuePropName="checked"
          initialValue={false}>
          <Switch checkedChildren={<LockOutlined />} unCheckedChildren={<UnlockOutlined />} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

CreateBoardModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default CreateBoardModal
