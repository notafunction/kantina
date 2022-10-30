import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router'
import { get, ref, remove, update } from 'firebase/database'
import { useDatabase, useUser } from 'reactfire'
import { BoardContext } from './BoardContext'
import { Button, Form, Input, Switch, message, Popconfirm, Divider, Modal } from 'antd'
import {
  WarningOutlined,
  LockOutlined,
  UnlockOutlined,
  CheckOutlined,
  CloseOutlined
} from '@ant-design/icons'
import { CirclePicker } from 'react-color'
import FormDangerZone from '../../../components/Form/FormDangerZone'
import BoardSettingsMember from './BoardSettingsMember'
import { colorPickerColors } from '../../../constants'
import Restricted from '@/containers/Permission/Restricted'

const BoardSettingsModal = (props) => {
  const db = useDatabase()
  const user = useUser()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const board = useContext(BoardContext)

  const [members, setMembers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      if (!board.members) {
        return setMembers([])
      }

      const members = await Promise.all(
        Object.keys(board.members).map(async (uid) => {
          const snap = await get(ref(db, `users/${uid}`))

          if (snap.exists()) {
            return {
              uid,
              ...snap.val()
            }
          }
        })
      )

      setMembers(members)
    }

    fetchData().catch(console.error)
  }, [board.members])

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
    <Modal
      title={`${board.title} Settings`}
      visible={props.visible}
      onCancel={props.close}
      onOk={onSave}>
      <Form layout="vertical" onFinish={onSave} form={form} preserve={false}>
        <Form.Item
          initialValue={board.title}
          name="title"
          label="Title"
          rules={[{ required: true, message: 'A title is required.' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="color"
          label="Color"
          initialValue={board.color}
          getValueFromEvent={({ hex }) => hex}>
          <CirclePicker width={null} colors={colorPickerColors} color={board.color} />
        </Form.Item>
        <Form.Item
          name="public"
          label="Public Board"
          help="Anyone with URL can view and edit"
          valuePropName="checked"
          initialValue={board.public}>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={board.public}
          />
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

        <Divider orientation="left" orientationMargin={0}>
          Board Members
        </Divider>

        {members.map((member) => (
          <BoardSettingsMember member={member} key={member.uid} />
        ))}

        <Restricted to="board:edit">
          <Button className="mt-4">Add Member</Button>
        </Restricted>

        <Restricted to="board:delete">
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
        </Restricted>
      </Form>
    </Modal>
  )
}

BoardSettingsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default BoardSettingsModal
