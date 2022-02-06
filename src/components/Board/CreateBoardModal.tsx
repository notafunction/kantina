import React from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import Board from '../../models/Board'

export interface CreateBoardModalProps {
  close: () => void
  visible: boolean
}

const CreateBoardModal = (props: CreateBoardModalProps) => {
  const [form] = Form.useForm()

  const onCreateBoard = (values: object) => {
    try {
      new Board(values).save()
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
