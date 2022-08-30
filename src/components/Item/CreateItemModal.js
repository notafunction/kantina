import React from 'react'
import PropTypes from 'prop-types'
import { useFirebase } from 'react-redux-firebase'
import { Form, Modal, Input } from 'antd'
import { CirclePicker } from 'react-color'
import { colorPickerColors } from '../../constants'
import { useDatabase, useDatabaseListData, useUser } from 'reactfire'
import { query, ref } from 'firebase/database'

const CreateItemModal = (props) => {
  const firebase = useFirebase()
  const db = useDatabase()
  const items = useDatabaseListData(query(ref(db, `items/${props.list.id}`)), { idField: 'id' })
  const user = useUser()
  const [form] = Form.useForm()

  const onCreateItem = async (values) =>
    firebase.push(`items/${props.list.id}`, {
      ...values,
      order: items ? items.length : 0
    })

  const onOk = async () => {
    const values = await form.validateFields()
    await onCreateItem({
      ...values,
      createdBy: user.data.uid
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
  list: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default CreateItemModal
