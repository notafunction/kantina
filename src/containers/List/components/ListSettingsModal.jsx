import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, message, Modal, Popconfirm } from 'antd'
import { WarningOutlined } from '@ant-design/icons'
import { CirclePicker } from 'react-color'
import { ref, remove, update } from 'firebase/database'
import { useDatabase } from 'reactfire'
import { colorPickerColors } from '../../../constants'
import FormDangerZone from '../../../components/Form/FormDangerZone'
import { ListContext } from './ListContext'
import { BoardContext } from '../../Board/components/BoardContext'
import Restricted from '@/containers/Permission/Restricted'

const ListSettingsModal = (props) => {
  const db = useDatabase()
  const [form] = Form.useForm()
  const list = useContext(ListContext)
  const board = useContext(BoardContext)

  const onSave = async () => {
    const values = await form.validateFields()
    try {
      await update(ref(db, `boards/${board.id}/lists/${list.id}`), values)
      props.close()
    } catch (error) {
      message.error(error.message)
    }
  }

  const onDelete = async () => {
    try {
      await remove(ref(db, `boards/${board.id}/lists/${list.id}`))
      props.close()
    } catch (error) {
      message.error(error.message)
      console.log(error)
    }
  }

  return (
    <Modal
      title={`${list.title} Settings`}
      visible={props.visible}
      onCancel={props.close}
      onOk={onSave}>
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
          <CirclePicker width={null} colors={colorPickerColors} color={list.color} />
        </Form.Item>

        <Restricted to="list:delete">
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
        </Restricted>
      </Form>
    </Modal>
  )
}

ListSettingsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default ListSettingsModal
