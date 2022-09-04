import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useDatabase } from 'reactfire'
import { WarningOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, Popconfirm } from 'antd'
import { ref, update, remove } from 'firebase/database'
import { CirclePicker } from 'react-color'
import SettingsDrawer from '../../../components/SettingsDrawer'
import { colorPickerColors } from '../../../constants'
import FormDangerZone from '../../../components/Form/FormDangerZone'
import { ListContext } from '../../List/List'
import { ItemContext } from '../Item'

const ItemSettingsDrawer = (props) => {
  const db = useDatabase()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const list = useContext(ListContext)
  const item = useContext(ItemContext)

  const onSave = async () => {
    setLoading(true)
    const values = await form.validateFields()
    try {
      await update(ref(db, `items/${item.id}`), values)
      props.close()
    } catch (error) {
      message.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      await Promise.all([
        remove(ref(db, `items/${item.id}`)),
        remove(ref(db, `lists/${list.id}/items/${item.id}`))
      ])
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
          initialValue={item.content}
          name="content"
          label="Content"
          rules={[{ required: true, message: 'Content is required' }]}>
          <Input.TextArea>{item.content}</Input.TextArea>
        </Form.Item>

        <Form.Item
          name="color"
          label="Color"
          initialValue={item.color}
          getValueFromEvent={({ hex }) => hex}>
          <CirclePicker colors={colorPickerColors} color={item.color} />
        </Form.Item>

        <FormDangerZone>
          <Popconfirm
            onConfirm={onDelete}
            okText="Yes"
            title="Are you sure?"
            okButtonProps={{ danger: true }}
            icon={<WarningOutlined />}>
            <Button danger>Delete Item</Button>
          </Popconfirm>
        </FormDangerZone>
      </Form>
    </SettingsDrawer>
  )
}

ItemSettingsDrawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default ItemSettingsDrawer
