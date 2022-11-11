import React, { useContext } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { CirclePicker } from 'react-color'
import { colorPickerColors } from '../../../constants'
import { useUser } from 'reactfire'
import { BoardContext } from './BoardContext'
import { createList } from '~/lib/api/lists'

type Props = {
  visible: boolean
  close: () => void
}

const CreateListModal: React.FunctionComponent<Props> = (
  props
) => {
  const user = useUser()
  const [form] = Form.useForm()
  const board = useContext(BoardContext)

  const onCreateList = async (values) => {
    try {
      await createList(
        { board },
        {
          ...values,
          createdBy: user.data.uid
        }
      )
    } catch (error) {
      message.error(error.code)
      console.log(error)
    }
  }

  const onOk = async () => {
    const values = await form.validateFields()
    await onCreateList(values)
    form.resetFields()
    props.close()
  }

  const onCancel = () => {
    form.resetFields()
    props.close()
  }

  return (
    <Modal
      title="Add New List"
      open={props.visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form layout="vertical" onFinish={onOk} form={form}>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please enter a title'
            }
          ]}
        >
          <Input />
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
            color="#eeeeee"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateListModal
