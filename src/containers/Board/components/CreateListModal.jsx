import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, message } from 'antd'
import { CirclePicker } from 'react-color'
import { colorPickerColors } from '../../../constants'
import { useDatabase, useUser } from 'reactfire'
import { push, ref, update } from 'firebase/database'
import { BoardContext } from './BoardContext'

const CreateListModal = (props) => {
  const user = useUser()
  const db = useDatabase()
  const [form] = Form.useForm()
  const board = useContext(BoardContext)

  const onCreateList = async (values) => {
    try {
      const result = await push(ref(db, `boards/${board.id}/lists`), {
        ...values,
        board: board.id,
        createdBy: user.data.uid,
        position: board.lists ? Object.keys(board.lists).length : 0
      })

      await update(result, {
        id: result.key
      })
    } catch (error) {
      message.error(error.code)
      console.log(error)
    }
  }

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
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default CreateListModal
