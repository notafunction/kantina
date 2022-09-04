import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Input } from 'antd'
import { CirclePicker } from 'react-color'
import { colorPickerColors } from '../../../constants'
import { useDatabase, useUser } from 'reactfire'
import { ref, push, set } from 'firebase/database'
import { ListContext } from '../List'

const CreateItemModal = (props) => {
  const db = useDatabase()
  const user = useUser()
  const [form] = Form.useForm()
  const list = useContext(ListContext)

  const onCreateItem = async (values) => {
    const result = push(ref(db, `items`), values)

    await set(ref(db, `lists/${list.id}/items/${result.key}`), true)
  }

  const onOk = async () => {
    const values = await form.validateFields()
    await onCreateItem({
      ...values,
      createdBy: user.data.uid,
      list: list.id
    })
    form.resetFields()
    props.close()
  }

  const onCancel = () => {
    form.resetFields()
    props.close()
  }

  return (
    <Modal title="Add New Item" visible={props.visible} centered onOk={onOk} onCancel={onCancel}>
      <Form onFinish={onOk} form={form} layout="vertical">
        <Form.Item
          name="content"
          label="Content"
          rules={[{ required: true, message: 'Please enter item content' }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="color"
          label="Color"
          initialValue={'#eeeeee'}
          getValueFromEvent={({ hex }) => hex}>
          <CirclePicker colors={colorPickerColors} color={'#eeeeee'} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

CreateItemModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default CreateItemModal
