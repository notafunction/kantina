import React from 'react'
import { Modal, Form, Input, Select } from 'antd'
import PropTypes from 'prop-types'
import { useFirebase } from 'react-redux-firebase'
import { useSelector } from 'react-redux'

const CreateBoardModal = (props) => {
  const firebase = useFirebase()
  const auth = useSelector(({ firebase }) => firebase.auth)
  const [form] = Form.useForm()

  const onCreateBoard = (values) => {
    console.log({
      ...values,
      createdBy: auth.uid
    })

    firebase.push('boards', {
      ...values,
      createdBy: auth.uid
    })
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

CreateBoardModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default CreateBoardModal
