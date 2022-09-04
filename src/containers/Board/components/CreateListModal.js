import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, message } from 'antd'
import { CirclePicker } from 'react-color'
import { colorPickerColors } from '../../../constants'
import { useDatabase } from 'reactfire'
import { push, ref, set } from 'firebase/database'
import { useParams } from 'react-router'

const CreateListModal = (props) => {
  const params = useParams()
  const db = useDatabase()
  const [form] = Form.useForm()

  const onCreateList = async (values) => {
    try {
      const result = await push(ref(db, `lists`), values)
      await set(ref(db, `boards/${params.boardId}/lists/${result.key}`), true)
    } catch (error) {
      message.error(error.code)
    }
  }

  const onOk = async () => {
    const values = await form.validateFields()
    await onCreateList({
      ...values,
      board: params.boardId
    })
    form.resetFields()
    props.close()
  }

  const onCancel = () => {
    form.resetFields()
    props.close()
  }

  return (
    <Modal title="Add New List" visible={props.visible} centered onOk={onOk} onCancel={onCancel}>
      <Form layout="vertical" onFinish={onOk} form={form}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter a title' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="color"
          label="Color"
          initialValue={'#eeeeee'}
          getValueFromEvent={({ hex }) => hex}>
          <CirclePicker colors={colorPickerColors} color="#eeeeee" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

CreateListModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default CreateListModal
