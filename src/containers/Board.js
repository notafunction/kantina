import React, { useState } from 'react'
import styled from 'styled-components'
import { CreateListModal } from '../components/List'
import Lists from './Lists'
import { useParams, useNavigate } from 'react-router'
import { Empty, Button, Result, PageHeader } from 'antd'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import Spin from '../components/Spin'
import { BoardContainer, BoardSettingsDrawer, BoardToolbar } from '../components/Board'

const BoardContent = styled.div`
  position: relative;
  flex-grow: 1;
`

const Board = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [boardSettingsVisible, setBoardSettingsVisible] = useState(false)
  const [createListModalVisible, setCreateListModalVisible] = useState(false)
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

  const renderBoardToolbar = () => {
    if (isEmpty(auth)) return null

    const handleToolbarClick = (event) => {
      switch (event.key) {
        case 'list:create': {
          setCreateListModalVisible(true)
          break
        }
        case 'board:settings': {
          setBoardSettingsVisible(true)
        }
      }
    }

    return <BoardToolbar handleClick={handleToolbarClick} />
  }

  const renderLists = () => {
    if (!isLoaded(lists)) return <Spin />

    if (!isEmpty(lists))
      return (
        <Lists
          lists={lists}
          board={{
            id: params.boardId,
            ...board
          }}
        />
      )

    return (
      <Empty description="There's nothing here" image={Empty.PRESENTED_IMAGE_SIMPLE}>
        {!isEmpty(auth) && (
          <Button onClick={() => setCreateListModalVisible(true)} type="primary">
            Create List
          </Button>
        )}
      </Empty>
    )
  }

  if (!isLoaded(board)) return <Spin />

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
        extra={renderBoardToolbar()}
      />

      <BoardContent>{renderLists()}</BoardContent>

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
        visible={boardSettingsVisible}
        close={() => setBoardSettingsVisible(false)}
      />
    </BoardContainer>
  )
}

export default Board
