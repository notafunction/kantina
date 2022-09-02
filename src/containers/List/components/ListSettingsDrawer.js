import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, message, Popconfirm } from 'antd'
import { WarningOutlined } from '@ant-design/icons'
import { useParams } from 'react-router'
import { CirclePicker } from 'react-color'
import { colorPickerColors } from '../../../constants'
import SettingsDrawer from '../../../components/SettingsDrawer'
import FormDangerZone from '../../../components/Form/FormDangerZone'
import { ref, remove, update } from 'firebase/database'
import { useDatabase } from 'reactfire'

const ListSettingsDrawer = (props) => {
  const db = useDatabase()
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const [form] = Form.useForm()

  const onSave = async () => {
    setLoading(true)
    const values = await form.validateFields()
    try {
      await update(`lists/${props.list.id}`, values)
      message.success('Your changes have been saved')
      props.close()
    } catch (error) {
      message.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    setLoading(true)
    try {
      await Promise.all(
        remove(ref(db, `lists/${props.list.id}`)),
        remove(ref(db, `boards/${params.boardId}/lists/${props.list.id}`))
      )
      message.success(`List has been deleted`)
      props.close()
    } catch (error) {
      message.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SettingsDrawer
      title={`${props.list.title} Settings`}
      visible={props.visible}
      close={props.close}
      onOk={onSave}
      okButtonProps={{ loading }}
      destroyOnClose>
      <Form layout="vertical" onFinish={onSave} form={form} preserve={false}>
        <Form.Item
          initialValue={props.list.title}
          name="title"
          label="Title"
          rules={[{ required: true, message: 'A title is required.' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="color"
          label="Color"
          initialValue={props.list.color}
          getValueFromEvent={({ hex }) => hex}>
          <CirclePicker colors={colorPickerColors} color={props.list.color} />
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
  close: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired
}

export default ListSettingsDrawer
