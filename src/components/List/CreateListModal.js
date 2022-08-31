import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, message, Spin } from 'antd'
import { CirclePicker } from 'react-color'
import { colorPickerColors } from '../../constants'
import { useDatabase, useDatabaseListData } from 'reactfire'
import { push, query, ref } from 'firebase/database'

const CreateListModal = (props) => {
  const db = useDatabase()
  const listsQuery = query(ref(db, `lists/${props.board.id}`))
  const { status: listsStatus, data: listsData } = useDatabaseListData(listsQuery, {
    idField: 'id'
  })
  const [form] = Form.useForm()

  if (listsStatus === 'loading') return <Spin />

  const onCreateList = async (values) => {
    try {
      await push(ref(db, `lists/${props.board.id}`), {
        ...values,
        order: listsData.length
      })
    } catch (error) {
      message.error(error.code)
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
  board: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default CreateListModal
