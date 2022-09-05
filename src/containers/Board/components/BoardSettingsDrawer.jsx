import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Switch, message, Select, Popconfirm } from 'antd'
import { WarningOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'
import SettingsDrawer from '../../../components/SettingsDrawer'
import FormDangerZone from '../../../components/Form/FormDangerZone'
import { ref, remove, update } from 'firebase/database'
import { useDatabase, useUser } from 'reactfire'
import { BoardContext } from './BoardContext'

const BoardSettingsDrawer = (props) => {
  const db = useDatabase()
  const user = useUser()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const board = useContext(BoardContext)

  const onSave = async () => {
    const values = await form.validateFields()
    try {
      await update(ref(db, `boards/${board.id}`), values)
      props.close()
    } catch (error) {
      message.error(error.message)
    }
  }

  const onDelete = async () => {
    try {
      navigate('/')
      remove(ref(db, `boards/${board.id}`))
      remove(ref(db, `users/${user.data.uid}/boards/${board.id}`))
      props.close()
    } catch (error) {
      message.error(error.message)
    }
  }

  return (
    <SettingsDrawer
      title={`${board.title} Settings`}
      visible={props.visible}
      close={props.close}
      onOk={onSave}
      destroyOnClose>
      <Form layout="vertical" onFinish={onSave} form={form} preserve={false}>
        <Form.Item
          initialValue={board.title}
          name="title"
          label="Title"
          rules={[{ required: true, message: 'A title is required.' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Type" initialValue={board.type}>
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
          initialValue={board.locked}>
          <Switch
            checkedChildren={<LockOutlined />}
            unCheckedChildren={<UnlockOutlined />}
            checked={board.locked}
          />
        </Form.Item>

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
      </Form>
    </SettingsDrawer>
  )
}

BoardSettingsDrawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default BoardSettingsDrawer
