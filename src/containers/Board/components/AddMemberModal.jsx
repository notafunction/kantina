import React from 'react'
import { Modal, Form, Input, Select, Switch, message } from 'antd'
import { LockOutlined, UnlockOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { useDatabase } from 'reactfire'
import { push, ref, set } from 'firebase/database'
import { CirclePicker } from 'react-color'
import { colorPickerColors } from '../../../constants'

const CreateBoardModal = (props) => {
  const db = useDatabase()
  const [form] = Form.useForm()

  const onOk = async () => {
    const values = await form.validateFields()
    form.resetFields()
    props.close()
  }

  const onCancel = () => {
    form.resetFields()
    props.close()
  }

  return (
    <Modal title="Add Member" visible={props.visible} onCancel={onCancel} onOk={onOk}>
      <Form layout="vertical" requiredMark={false} onFinish={onOk} form={form}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter a title' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="color"
          label="Color"
          initialValue="#eeeeee"
          getValueFromEvent={({ hex }) => hex}>
          <CirclePicker width={null} colors={colorPickerColors} color="#eeeeee" />
        </Form.Item>
        <Form.Item name="public" label="Type" initialValue={true}>
          <Select>
            <Select.Option value={false}>Private</Select.Option>
            <Select.Option value={true}>Public</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="locked"
          label="Lock"
          help="Allow changes only by board admins"
          valuePropName="checked"
          initialValue={false}>
          <Switch checkedChildren={<LockOutlined />} unCheckedChildren={<UnlockOutlined />} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

CreateBoardModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default CreateBoardModal
