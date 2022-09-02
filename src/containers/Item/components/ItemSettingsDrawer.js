import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDatabase } from 'reactfire'
import { Form, Input, message } from 'antd'
import { ref, update, remove } from 'firebase/database'
import SettingsDrawer from '../../../components/SettingsDrawer'
import { CirclePicker } from 'react-color'
import { colorPickerColors } from '../../../constants'

const ItemSettingsDrawer = (props) => {
  const db = useDatabase()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const onSave = async () => {
    setLoading(true)
    const values = await form.validateFields()
    try {
      await update(ref(db, `items/${props.item.id}`), values)
      message.success('Your changes have been saved')
      props.close()
    } catch (error) {
      message.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      await Promise.all(
        remove(ref(db, `items/${props.item.id}`)),
        remove(ref(db, `lists/${props.list.id}/items/${props.item.id}`))
      )
    } catch (error) {
      message.error(error.message)
    }
  }

  return (
    <SettingsDrawer
      title={`Edit Item`}
      visible={props.visible}
      close={props.close}
      onOk={onSave}
      okButtonProps={{ loading }}
      destroyOnClose>
      <Form layout="vertical" onFinish={onSave} form={form} preserve={false}>
        <Form.Item
          initialValue={props.item.content}
          name="content"
          label="Content"
          rules={[{ required: true, message: 'Content is required' }]}>
          <Input.TextArea>{props.item.content}</Input.TextArea>
        </Form.Item>

        <Form.Item
          name="color"
          label="Color"
          initialValue={props.item.color}
          getValueFromEvent={({ hex }) => hex}>
          <CirclePicker color={colorPickerColors} color={props.item.color} />
        </Form.Item>
      </Form>
    </SettingsDrawer>
  )
}

ItemSettingsDrawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired
}

export default ItemSettingsDrawer
