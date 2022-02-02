/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import styled from 'styled-components'
import { grid } from '../constants'
import Lists from './Lists'
import { useNavigate, useParams } from 'react-router'
import { Dropdown, Menu, Modal, Form, Input, Empty, Button, PageHeader } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useFirebase, useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import StyledSpin from '../components/Spin'
import { BoardContainer, BoardHeader } from '../components/Board'

const BoardContent = styled.div`
  position: relative;
  flex-grow: 1;
`

const Board = () => {
  const navigate = useNavigate()
  const params = useParams()

  useFirebaseConnect([
    `boards/${params.boardId}`,
    { path: `lists/${params.boardId}`, queryParams: ['orderByChild=order'] }
  ])

  const [createListModalVisible, setCreateListModalVisible] = useState(false)

  const [createListForm] = Form.useForm()
  const firebase = useFirebase()
  const auth = useSelector(({ firebase: { auth } }) => auth)
  const board = useSelector(({ firebase: { data } }) => data.boards && data.boards[params.boardId])
  const lists = useSelector(
    ({
      firebase: {
        ordered: { lists }
      }
    }) => lists && lists[params.boardId]
  )

  const onCreateList = async (values) =>
    firebase.push(`lists/${params.boardId}`, {
      ...values,
      order: lists ? lists.length : 0
    })

  const onDeleteBoard = async () => {
    navigate('/')
    await firebase.ref(`boards/${params.boardId}`).remove()
  }

  const onEditBoard = () => {
    console.log('edit')
  }

  const boardOptionsMenu = (
    <Menu>
      <Menu.Item key="1" icon={<EditOutlined />} onClick={onEditBoard}>
        Edit Board
      </Menu.Item>
      <Menu.Item key="2" icon={<DeleteOutlined />} onClick={onDeleteBoard}>
        Delete Board
      </Menu.Item>
    </Menu>
  )

  if (!isLoaded(board)) return <StyledSpin />

  return (
    <BoardContainer>
      <PageHeader
        title={board.title}
        extra={
          !isEmpty(auth) && (
            <Dropdown.Button
              overlay={boardOptionsMenu}
              onClick={() => setCreateListModalVisible(true)}>
              Create List
            </Dropdown.Button>
          )
        }
      />
      <BoardContent>
        {!isLoaded(lists) ? (
          <StyledSpin />
        ) : !isEmpty(lists) ? (
          <Lists
            lists={lists}
            board={{
              id: params.boardId,
              ...board
            }}
          />
        ) : (
          <Empty description="There's nothing here" image={Empty.PRESENTED_IMAGE_SIMPLE}>
            {!isEmpty(auth) && (
              <Button onClick={() => setCreateListModalVisible(true)} type="primary">
                Create List
              </Button>
            )}
          </Empty>
        )}
      </BoardContent>

      <Modal
        title="Add New List"
        visible={createListModalVisible}
        centered
        onOk={() =>
          createListForm
            .validateFields()
            .then(onCreateList)
            .then(() => {
              setCreateListModalVisible(false)
              createListForm.resetFields()
            })
        }
        onCancel={() => {
          setCreateListModalVisible(false)
          createListForm.resetFields()
        }}>
        <Form
          requiredMark={false}
          layout="vertical"
          onFinish={(payload) =>
            onCreateList(payload).then(() => {
              setCreateListModalVisible(false)
              createListForm.resetFields()
            })
          }
          form={createListForm}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter a title' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </BoardContainer>
  )
}

export default Board
