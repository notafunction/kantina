import React, { useEffect, useState } from 'react'
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd'
import { useParams, useNavigate } from 'react-router'
import { ObservableStatus, useDatabase, useDatabaseObjectData, useSigninCheck } from 'reactfire'
import { ref, set } from 'firebase/database'
import { Button, Result, PageHeader, Spin, message } from 'antd'
import Styled from './components/Styled'
import ListComponent from '../List/List'
import { BoardContext } from './components/BoardContext'
import PermissionProvider from '@/containers/Permission/PermissionProvider'
import BoardToolbar from './components/BoardToolbar'
import CreateListColumn from './components/CreateListColumn'
import Restricted from '@/containers/Permission/Restricted'
import { usePermission } from '../../hooks'
import { Board } from '@/types'
import { handleDragEvent, sortByPosition } from './utils'

const BoardComponent: React.FunctionComponent = () => {
  const navigate = useNavigate()
  const params = useParams()
  const db = useDatabase()
  const auth = useSigninCheck()

  const board: ObservableStatus<Board> = useDatabaseObjectData(ref(db, `boards/${params.boardId}`), {
    idField: 'id',
  })

  const [state, setState] = useState<Board>(board.data)
  const [userRole, setUserRole] = useState(null)

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

  useEffect(() => {
    if (board.status === 'success') {
      if (board.data) {
        setState(board.data)
      }
    }
  }, [board.data])

  useEffect(() => {
    if (auth.status === 'success') {
      if (auth.data.signedIn) {
        if (Object.keys(board.data.members).includes(auth.data.user.uid)) {
          return setUserRole(board.data.members[auth.data.user.uid].role)
        }
      }
    }

    return setUserRole(null)
  }, [auth.data])

  const renderLists = () => {
    const canEditLists = usePermission('list:edit')

    if (state.lists) {
      return sortByPosition(state.lists).map((list, index) => (
        <Draggable key={list.id} index={index} draggableId={list.id} isDragDisabled={!canEditLists}>
          {(draggableProvided, _draggableSnapshot) => (
            <Styled.ListWrapper
              ref={draggableProvided.innerRef}
              {...draggableProvided.draggableProps}>
              <ListComponent list={list} dragHandleProps={draggableProvided.dragHandleProps} />
            </Styled.ListWrapper>
          )}
        </Draggable>
      ))
    }
  }

  const onDragEnd = async (event) => {
    const updatedBoard = handleDragEvent(event, state)

    setState(updatedBoard)
    set(ref(db, `boards/${board.data.id}`), updatedBoard)
  }

  return (
    <PermissionProvider role={userRole}>
      <BoardContext.Provider value={state}>
        <Styled.BoardContainer backgroundColor={state.color}>
          <PageHeader title={state.title} extra={<BoardToolbar />} />
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

                    <Restricted to="board:edit">
                      <CreateListColumn />
                    </Restricted>
                  </Styled.ListsContainer>
                )}
              </Droppable>
            </DragDropContext>
          </Styled.Content>
        </Styled.BoardContainer>
      </BoardContext.Provider>
    </PermissionProvider>
  )
}

export default BoardComponent
