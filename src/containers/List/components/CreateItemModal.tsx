import React, { useContext } from 'react'
import { Form, Modal, Input } from 'antd'
import { CirclePicker } from 'react-color'
import { colorPickerColors } from '../../../constants'
import { useUser } from 'reactfire'
import { ListContext } from './ListContext'
import { BoardContext } from '../../Board/components/BoardContext'
import { createItem } from '~/lib/api/items'

type Props = {
  visible: boolean
  close: () => void
}

const CreateItemModal: React.FunctionComponent<Props> = (
  props
) => {
  const user = useUser()
  const [form] = Form.useForm()
  const list = useContext(ListContext)
  const board = useContext(BoardContext)

  const onCreateItem = async (values) => {
    await createItem(
      { board, list },
      {
        ...values,
        createdBy: user.data.uid
      }
    )
  }

  const onOk = async () => {
    const values = await form.validateFields()
    await onCreateItem(values)
    form.resetFields()
    props.close()
  }

  const onCancel = () => {
    form.resetFields()
    props.close()
  }

  return (
    <Modal
      title="Add New Item"
      open={props.visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form onFinish={onOk} form={form} layout="vertical">
        <Form.Item
          name="content"
          label="Content"
          rules={[
            {
              required: true,
              message: 'Please enter item content'
            }
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="color"
          label="Color"
          initialValue={'#eeeeee'}
          getValueFromEvent={({ hex }) => hex}
        >
          <CirclePicker
            width={null}
            colors={colorPickerColors}
            color={'#eeeeee'}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateItemModal
