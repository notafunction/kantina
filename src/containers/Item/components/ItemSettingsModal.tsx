import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useDatabase } from 'reactfire'
import { WarningOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, Modal, Popconfirm } from 'antd'
import { ref, update, remove } from 'firebase/database'
import { CirclePicker } from 'react-color'
import { colorPickerColors } from '../../../constants'
import FormDangerZone from '../../../components/Form/FormDangerZone'
import { ListContext } from '../../List/components/ListContext'
import { ItemContext } from './ItemContext'
import { BoardContext } from '../../Board/components/BoardContext'
import Restricted from '@/containers/Permission/Restricted'
import { Board, Item, List } from '@/types'

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
