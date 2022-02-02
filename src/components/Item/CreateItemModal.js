import React from 'react'
import PropTypes from 'prop-types'
import { useFirebase } from 'react-redux-firebase'
import { Form, Modal, Input } from 'antd'
import { useSelector } from 'react-redux'
import { CirclePicker } from 'react-color'
import { colorPickerColors } from '../../constants'

const CreateItemModal = (props) => {
  const firebase = useFirebase()
  const [form] = Form.useForm()
  const auth = useSelector(({ firebase: { auth } }) => auth)
  const items = useSelector(
    ({
      firebase: {
        ordered: { items }
      }
    }) => items && items[props.list.id]
  )

  const onCreateItem = async (values) =>
    firebase.push(`items/${props.list.id}`, {
      ...values,
      order: items ? items.length : 0
    })

  const onOk = async () => {
    const values = await form.validateFields()
    await onCreateItem({
      ...values,
      createdBy: auth.uid
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
        <Form.Item name="color" label="Color">
          <CirclePicker colors={colorPickerColors} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

CreateItemModal.propTypes = {
  list: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default CreateItemModal
