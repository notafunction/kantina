import React, { createContext, useState } from 'react'
import { CreateListModal } from '../../components/List'
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd'
import { useParams, useNavigate } from 'react-router'
import { useDatabase, useDatabaseObjectData, useSigninCheck } from 'reactfire'
import { ref } from 'firebase/database'
import { Button, Result, PageHeader, Spin } from 'antd'
import Styled from './components/Styled'
import List from '../List/List'
import BoardSettingsDrawer from './components/BoardSettingsDrawer'
import UserToolbar from './components/UserToolbar'
import { set } from 'react-ga'

export const BoardContext = createContext()

const Board = () => {
  const navigate = useNavigate()
  const params = useParams()
  const db = useDatabase()
  const auth = useSigninCheck()

  const board = useDatabaseObjectData(ref(db, `boards/${params.boardId}`), {
    idField: 'id'
  })

  const [boardSettingsVisible, setBoardSettingsVisible] = useState(false)
  const [createListModalVisible, setCreateListModalVisible] = useState(false)

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

  if (board.status === 'loading') return <Spin />

  if (!board.data) {
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

  const renderLists = () => {
    if (board.data.lists) {
      return Object.keys(board.data.lists).map((id, index) => (
        <Draggable
          key={id}
          index={index}
          draggableId={id}
          isDragDisabled={auth.status !== 'success' || !auth.data.signedIn}>
          {(draggableProvided, _draggableSnapshot) => (
            <Styled.ListWrapper
              ref={draggableProvided.innerRef}
              {...draggableProvided.draggableProps}>
              <List id={id} dragHandleProps={draggableProvided.dragHandleProps} />
            </Styled.ListWrapper>
          )}
        </Draggable>
      ))
    }
  }

  const onDragEnd = (event) => {
    console.log(event)

    const { type, destination, source, draggableId } = event

    switch (type) {
      case 'ITEM': {
        if (source.droppableId === destination.droppableId) {
        }
      }
    }
  }

  return (
    <BoardContext.Provider value={board.data}>
      <Styled.BoardContainer>
        <PageHeader title={board.data.title} extra={<UserToolbar onClick={handleToolbarClick} />} />

        <Styled.Content>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={params.boardId} type="LIST" direction="horizontal">
              {(droppableProvided, _droppableSnapshot) => (
                <Styled.ListsContainer
                  flex
                  ref={droppableProvided.innerRef}
                  {...droppableProvided.droppableProps}>
                  {renderLists()}
                  {droppableProvided.placeholder}
                </Styled.ListsContainer>
              )}
            </Droppable>
          </DragDropContext>
        </Styled.Content>

        <CreateListModal
          visible={createListModalVisible}
          close={() => setCreateListModalVisible(false)}
        />

        <BoardSettingsDrawer
          visible={boardSettingsVisible}
          close={() => setBoardSettingsVisible(false)}
        />
      </Styled.BoardContainer>
    </BoardContext.Provider>
  )
}

export default Board
