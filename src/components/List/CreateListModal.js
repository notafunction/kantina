import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input } from 'antd'
import { isEmpty, useFirebase } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { CirclePicker } from 'react-color'
import { colorPickerColors } from '../../constants'

const CreateListModal = (props) => {
  const firebase = useFirebase()
  const [form] = Form.useForm()
  const lists = useSelector(
    ({
      firebase: {
        ordered: { lists }
      }
    }) => lists && lists[props.board.id]
  )

  const onCreateList = async (values) =>
    firebase.push(`lists/${props.board.id}`, {
      ...values,
      order: !isEmpty(lists) ? lists.length : 0
    })

  const onOk = async () => {
    const values = await form.validateFields()
    await onCreateList(values)
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
  board: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default CreateListModal
