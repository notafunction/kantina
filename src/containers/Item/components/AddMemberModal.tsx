import React, { useContext } from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import { useDatabase } from 'reactfire'
import { ref, set, query, orderByChild, equalTo, limitToFirst, get } from 'firebase/database'
import { useParams } from 'react-router'
import { ListContext } from '../../List/components/ListContext'
import { ItemContext } from './ItemContext'
import { Item, List } from '~/src/types'

type Props = {
  visible: boolean
  close: () => void
}

const AddMemberModal: React.FunctionComponent<Props> = (props) => {
  const params = useParams()
  const db = useDatabase()
  const [form] = Form.useForm()
  const list: List = useContext(ListContext)
  const item: Item = useContext(ItemContext)

  const onOk = async () => {
    const { email, role } = await form.validateFields()

    const userQuery = query(
      ref(db, 'users'),
      orderByChild('email'),
      equalTo(email),
      limitToFirst(1)
    )
    const userSnap = await get(userQuery)

    if (userSnap.exists()) {
      const [uid] = Object.keys(userSnap.val())
      set(
        ref(db, `boards/${params.boardId}/lists/${list.id}/items/${item.id}/members/${uid}`),
        true
      )

      form.resetFields()
      props.close()
    } else {
      message.error('That user does not exits')
    }
  }

  const onCancel = () => {
    form.resetFields()
    props.close()
  }

  return (
    <Modal centered title="Add Member" open={props.visible} onCancel={onCancel} onOk={onOk}>
      <Form layout="vertical" requiredMark={false} onFinish={onOk} form={form}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter an email address' },
            { type: 'email', message: 'Please enter a valid email address' }
          ]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddMemberModal
