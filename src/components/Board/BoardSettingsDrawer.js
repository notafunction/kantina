import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, message, Select, Popconfirm } from 'antd'
import { WarningOutlined } from '@ant-design/icons'
import { useFirebase } from 'react-redux-firebase'
import { useNavigate } from 'react-router'
import SettingsDrawer from '../SettingsDrawer'
import FormDangerZone from '../Form/FormDangerZone'

const BoardSettingsDrawer = (props) => {
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()
  const firebase = useFirebase()
  const [form] = Form.useForm()

  const onSave = async () => {
    setLoading(true)
    try {
      const values = await form.validateFields()
      firebase.ref(`boards/${props.board.id}`).update(values)
    } catch (error) {
      message.error(error)
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      // Delete board
      firebase.ref(`boards/${props.board.id}`).remove()
      // Loops through lists and delete items, then list itself
      const listSnapshots = await firebase.ref(`lists/${props.board.id}`).orderByKey().once('value')
      listSnapshots.forEach((snapshot) => {
        firebase.ref(`items/${snapshot.key}`).remove()
        snapshot.ref.remove()
      })

      props.close()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SettingsDrawer
      title={`${props.board.title} Settings`}
      visible={props.visible}
      close={props.close}
      onOk={onSave}
      okButtonProps={{ loading }}>
      <Form layout="vertical" onFinish={onSave} form={form}>
        <Form.Item
          initialValue={props.board.title}
          name="title"
          label="Title"
          rules={[{ required: true, message: 'A title is required.' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Type" initialValue={props.board.type}>
          <Select>
            <Select.Option value="private">Private</Select.Option>
            <Select.Option value="public">Public</Select.Option>
          </Select>
        </Form.Item>
      </Form>

      <FormDangerZone>
        <Popconfirm
          onConfirm={onDelete}
          okText="Yes"
          title="Are you sure? This cannot be undone"
          okButtonProps={{ danger: true }}
          icon={<WarningOutlined />}>
          <Button danger>Delete Board</Button>
        </Popconfirm>
      </FormDangerZone>
    </SettingsDrawer>
  )
}

BoardSettingsDrawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  board: PropTypes.object.isRequired
}

export default BoardSettingsDrawer
