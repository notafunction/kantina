import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, message, Popconfirm } from 'antd'
import { WarningOutlined } from '@ant-design/icons'
import { useParams } from 'react-router'
import { CirclePicker } from 'react-color'
import { ref, remove, update } from 'firebase/database'
import { useDatabase } from 'reactfire'
import { colorPickerColors } from '../../../constants'
import SettingsDrawer from '../../../components/SettingsDrawer'
import FormDangerZone from '../../../components/Form/FormDangerZone'
import { ListContext } from '../List'

const ListSettingsDrawer = (props) => {
  const db = useDatabase()
  const params = useParams()
  const [form] = Form.useForm()
  const list = useContext(ListContext)

  const onSave = async () => {
    const values = await form.validateFields()
    try {
      await update(ref(db, `lists/${list.id}`), values)
      props.close()
    } catch (error) {
      message.error(error.message)
    }
  }

  const onDelete = async () => {
    try {
      await Promise.all(
        remove(ref(db, `lists/${list.id}`)),
        remove(ref(db, `boards/${params.boardId}/lists/${list.id}`))
      )
      props.close()
    } catch (error) {
      message.error(error.message)
    }
  }

  return (
    <SettingsDrawer
      title={`${list.title} Settings`}
      visible={props.visible}
      close={props.close}
      onOk={onSave}
      destroyOnClose>
      <Form layout="vertical" onFinish={onSave} form={form} preserve={false}>
        <Form.Item
          initialValue={list.title}
          name="title"
          label="Title"
          rules={[{ required: true, message: 'A title is required.' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="color"
          label="Color"
          initialValue={list.color}
          getValueFromEvent={({ hex }) => hex}>
          <CirclePicker colors={colorPickerColors} color={list.color} />
        </Form.Item>

        <FormDangerZone>
          <Popconfirm
            onConfirm={onDelete}
            okText="Yes"
            title="Are you sure? This cannot be undone"
            okButtonProps={{ danger: true }}
            icon={<WarningOutlined />}>
            <Button danger>Delete List</Button>
          </Popconfirm>
        </FormDangerZone>
      </Form>
    </SettingsDrawer>
  )
}

ListSettingsDrawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default ListSettingsDrawer
