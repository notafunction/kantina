import React from 'react'
import { Button, Divider, Form, Input, message, Select } from 'antd'
import { useFirebase } from 'react-redux-firebase'
import { useNavigate } from 'react-router'
import SettingsDrawer from '../SettingsDrawer'
import { Board } from '../../common/types'

export type Props = {
  board: Board
  visible: boolean
  close: () => void
}

const BoardSettingsDrawer = (props: Props) => {
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
      message.error('Could not update the board')
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

      <Divider orientation="left" orientationMargin={0}>
        Danger Zone
      </Divider>
      <Button danger onClick={onDelete}>
        Delete Board
      </Button>
    </SettingsDrawer>
  )
}

export default BoardSettingsDrawer
