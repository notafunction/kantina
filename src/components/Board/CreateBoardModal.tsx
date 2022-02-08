import React from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import { BoardInput } from '../../common/types'
import { useFirebase } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

export interface CreateBoardModalProps {
  close: () => void
  visible: boolean
}

const CreateBoardModal = (props: CreateBoardModalProps) => {
  const [form] = Form.useForm()
  const firebase = useFirebase()
  const auth = useSelector(({ firebase: { auth } }: RootState) => auth)

  const onCreateBoard = (values: BoardInput) => {
    try {
      values.createdBy = auth.uid
      firebase.push('boards', values)
    } catch (error) {
      message.error('The board could not be created')
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
      </Form>
    </Modal>
  )
}

export default CreateBoardModal
