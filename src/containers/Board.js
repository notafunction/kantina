import React, { useState } from 'react'
import styled from 'styled-components'
import { CreateListModal } from '../components/List'
import Lists from './Lists'
import { useParams, useNavigate } from 'react-router'
import { Dropdown, Menu, Empty, Button, Result, PageHeader } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import StyledSpin from '../components/Spin'
import { BoardContainer, BoardSettingsDrawer } from '../components/Board'

const BoardContent = styled.div`
  position: relative;
  flex-grow: 1;
`

const Board = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [editOpen, setEditOpen] = useState(false)
  const auth = useSelector(({ firebase: { auth } }) => auth)
  const board = useSelector(({ firebase: { data } }) => data.boards && data.boards[params.boardId])
  useFirebaseConnect([
    `boards/${params.boardId}`,
    {
      path: `lists/${params.boardId}`,
      queryParams: ['orderByChild=order'],
      populates: [{ child: 'createdBy', root: 'users' }]
    }
  ])
  const [createListModalVisible, setCreateListModalVisible] = useState(false)
  const creator = useSelector(
    ({
      firebase: {
        data: { users }
      }
    }) => users && users[board.createdBy]
  )
  const lists = useSelector(
    ({
      firebase: {
        ordered: { lists }
      }
    }) => lists && lists[params.boardId]
  )

  const onEditBoard = () => {
    setEditOpen(true)
  }

  const boardOptionsMenu = (
    <Menu>
      <Menu.Item key="1" icon={<SettingOutlined />} onClick={onEditBoard}>
        Board Settings
      </Menu.Item>
    </Menu>
  )

  if (!isLoaded(board)) return <StyledSpin />

  if (isEmpty(board)) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="This isn't the board you're looking for"
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            Back Home
          </Button>
        }
      />
    )
  }

  return (
    <BoardContainer>
      <PageHeader
        title={board.title}
        subTitle={!isEmpty(creator) && `created by ${creator.displayName}`}
        extra={
          <Dropdown.Button
            overlay={boardOptionsMenu}
            onClick={() => setCreateListModalVisible(true)}>
            Create List
          </Dropdown.Button>
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

      <CreateListModal
        visible={createListModalVisible}
        close={() => setCreateListModalVisible(false)}
        board={{
          ...board,
          id: params.boardId
        }}
      />

      <BoardSettingsDrawer
        board={{
          ...board,
          id: params.boardId
        }}
        visible={editOpen}
        close={() => setEditOpen(false)}
      />
    </BoardContainer>
  )
}

export default Board
