import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useDatabase } from 'reactfire'
import { WarningOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, Popconfirm } from 'antd'
import { ref, update, remove } from 'firebase/database'
import { CirclePicker } from 'react-color'
import SettingsDrawer from '../../../components/SettingsDrawer'
import { colorPickerColors } from '../../../constants'
import FormDangerZone from '../../../components/Form/FormDangerZone'
import { ListContext } from '../../List/components/ListContext'
import { ItemContext } from './ItemContext'
import { BoardContext } from '../../Board/components/BoardContext'

const ItemSettingsDrawer = (props) => {
  const db = useDatabase()
  const [form] = Form.useForm()
  const board = useContext(BoardContext)
  const list = useContext(ListContext)
  const item = useContext(ItemContext)

  const onSave = async () => {
    const values = await form.validateFields()
    try {
      await update(ref(db, `boards/${board.id}/lists/${list.id}/items/${item.id}`), values)
      props.close()
    } catch (error) {
      message.error(error.message)
    }
  }

  const onDelete = async () => {
    try {
      await remove(ref(db, `lists/${list.id}/items/${item.id}`))
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
