import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Switch, message, Select, Popconfirm } from 'antd'
import { WarningOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons'
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
    const values = await form.validateFields()
    try {
      await firebase.update(`boards/${props.board.id}`, values)
      message.success('Your changes have been saved')
      props.close()
    } catch (error) {
      message.error('There was a problem saving your changes')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      // Delete board
      await firebase.remove(`boards/${props.board.id}`)
      // Loops through lists and delete items, then list itself
      const listSnapshots = await firebase.ref(`lists/${props.board.id}`).orderByKey().once('value')
      await Promise.all(
        listSnapshots.map(async (snapshot) => {
          await firebase.remove(`items/${snapshot.key}`)
          await snapshot.ref.remove()
        })
      )

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
      okButtonProps={{ loading }}
      destroyOnClose>
      <Form layout="vertical" onFinish={onSave} form={form} preserve={false}>
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
        <Form.Item
          name="locked"
          label="Lock"
          help="Allow changes only by board admins"
          valuePropName="checked"
          initialValue={props.board.locked}>
          <Switch
            checkedChildren={<LockOutlined />}
            unCheckedChildren={<UnlockOutlined />}
            checked={props.board.locked}
          />
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
