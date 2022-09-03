import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Switch, message, Select, Popconfirm } from 'antd'
import { WarningOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router'
import SettingsDrawer from '../../../components/SettingsDrawer'
import FormDangerZone from '../../../components/Form/FormDangerZone'
import { ref, remove, update } from 'firebase/database'
import { useDatabase } from 'reactfire'

const BoardSettingsDrawer = (props) => {
  const params = useParams()
  const db = useDatabase()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onSave = async () => {
    const values = await form.validateFields()
    try {
      await update(ref(db, `boards/${params.boardId}`), values)
    } catch (error) {
      message.error(error.message)
      console.error(error)
    }
  }

  const onDelete = async () => {
    try {
      await remove(ref(db, `boards/${params.boardId}`))
      props.close()
      navigate('/')
    } catch (error) {
      message.error(error.message)
      console.error(error)
    }
  }

  return (
    <SettingsDrawer
      title={`${props.board.title} Settings`}
      visible={props.visible}
      close={props.close}
      onOk={onSave}
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
