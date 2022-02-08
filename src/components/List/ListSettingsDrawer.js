import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, message, Popconfirm } from 'antd'
import { WarningOutlined } from '@ant-design/icons'
import { useFirebase } from 'react-redux-firebase'
import { useParams } from 'react-router'
import { CirclePicker } from 'react-color'
import { colorPickerColors } from '../../constants'
import SettingsDrawer from '../SettingsDrawer'
import FormDangerZone from '../Form/FormDangerZone'

const ListSettingsDrawer = (props) => {
  const { boardId } = useParams()
  const firebase = useFirebase()
  const [form] = Form.useForm()

  const onSave = async () => {
    const values = await form.validateFields()
    try {
      await firebase.update(`lists/${boardId}/${props.list.id}`, values)
      message.success('Your changes have been saved')
      props.close()
    } catch (error) {
      message.error('There was a problem saving your changes')
      console.error(error)
    }
  }

  const onDelete = async () => {
    try {
      // Remove list
      firebase.ref(`lists/${boardId}/${props.list.id}`).remove()
      // Remove items
      firebase.ref(`items/${props.list.id}`).remove()

      props.close()
      message.success(`List has been deleted`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SettingsDrawer
      title={`${props.list.title} Settings`}
      onOk={onSave}
      visible={props.visible}
      close={props.close}>
      <Form layout="vertical" onFinish={onSave} form={form}>
        <Form.Item
          initialValue={props.list.title}
          name="title"
          label="Title"
          rules={[{ required: true, message: 'A title is required.' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="color" label="Color" initialValue={props.list.color.hex}>
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
