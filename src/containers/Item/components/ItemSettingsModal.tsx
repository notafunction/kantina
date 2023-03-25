import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDatabase } from 'reactfire'
import { WarningOutlined } from '@ant-design/icons'
import { Avatar, Button, Divider, Form, Input, message, Modal, Popconfirm } from 'antd'
import { get, ref, update, remove } from 'firebase/database'
import { CirclePicker } from 'react-color'
import { colorPickerColors } from '../../../constants'
import FormDangerZone from '../../../components/Form/FormDangerZone'
import { ListContext } from '../../List/components/ListContext'
import { ItemContext } from './ItemContext'
import { BoardContext } from '../../Board/components/BoardContext'
import Restricted from '@/containers/Permission/Restricted'
import { Board, Item, List, UserProfile } from '@/types'
import AddMemberModal from './AddMemberModal'

type Props = {
  visible: boolean
  close: () => void
}

const ItemSettingsModal: React.FunctionComponent<Props> = (props) => {
  const db = useDatabase()
  const [form] = Form.useForm()
  const board: Board = useContext(BoardContext)
  const list: List = useContext(ListContext)
  const item: Item = useContext(ItemContext)

  const [members, setMembers] = useState<UserProfile[]>([])
  const [isAddMemberModalVisible, setIsAddMemberModalVisible] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!item.members) {
        return setMembers([])
      }

      const members = await Promise.all(
        Object.keys(item.members).map(async (uid) => {
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
  }, [item.members])

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
      await remove(ref(db, `boards/${board.id}/lists/${list.id}/items/${item.id}`))
      props.close()
    } catch (error) {
      message.error(error.message)
    }
  }

  return (
    <Modal title="Edit Item" open={props.visible} onCancel={props.close} onOk={onSave}>
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
          <CirclePicker width={null} colors={colorPickerColors} color={item.color} />
        </Form.Item>

        <Restricted to="member:read">
          <Divider orientation="left" orientationMargin={0}>
            Members
          </Divider>

          <div className="flex flex-col gap-2">
            <Avatar.Group>
              {members.map((member) => (
                <Avatar src={member.photoURL ?? null}>
                  {!member.photoURL
                    ? member.displayName
                        .split(' ')
                        .map((word) => word.charAt(0))
                        .join('')
                    : null}
                </Avatar>
              ))}
            </Avatar.Group>

            <Restricted to="member:create">
              <Button className="mt-4 self-start" onClick={() => setIsAddMemberModalVisible(true)}>
                Add Member
              </Button>

              <AddMemberModal
                visible={isAddMemberModalVisible}
                close={() => setIsAddMemberModalVisible(false)}
              />
            </Restricted>
          </div>
        </Restricted>

        <Restricted to="item:delete">
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
        </Restricted>
      </Form>
    </Modal>
  )
}

ItemSettingsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default ItemSettingsModal
