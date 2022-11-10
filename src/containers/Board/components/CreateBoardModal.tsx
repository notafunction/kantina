import React from 'react'
import { Modal, Form, Input, Select, Switch, message } from 'antd'
import { LockOutlined, UnlockOutlined } from '@ant-design/icons'
import { useDatabase, useUser } from 'reactfire'
import { ref, set } from 'firebase/database'
import { CirclePicker } from 'react-color'
import { colorPickerColors } from '../../../constants'
import { createBoard } from '~/lib/api/boards'

type Props = {
  visible: boolean
  close: () => void
}

const CreateBoardModal: React.FunctionComponent<Props> = (props) => {
  const db = useDatabase()
  const user = useUser()
  const [form] = Form.useForm()

  const onCreateBoard = async (values) => {
    try {
      const boardRef = await createBoard({
        ...values,
        createdBy: user.data.uid,
        members: {
          [user.data.uid]: {
            role: 'admin'
          }
        }
      })

      set(ref(db, `users/${user.data.uid}/boards/${boardRef.key}`), {
        role: 'admin'
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
    <Modal key="2" title="Create Board" open={props.visible} onCancel={onCancel} onOk={onOk}>
      <Form layout="vertical" requiredMark={false} onFinish={onOk} form={form}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter a title' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="color"
          label="Color"
          initialValue="#eeeeee"
          getValueFromEvent={({ hex }) => hex}>
          <CirclePicker width={null} colors={colorPickerColors} color="#eeeeee" />
        </Form.Item>
        <Form.Item name="public" label="Type" initialValue={true}>
          <Select>
            <Select.Option value={false}>Private</Select.Option>
            <Select.Option value={true}>Public</Select.Option>
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

export default CreateBoardModal
