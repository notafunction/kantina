import React, { useEffect, useState } from 'react'
import {
  Droppable,
  DragDropContext
} from 'react-beautiful-dnd'
import { useParams, useNavigate } from 'react-router'
import {
  ObservableStatus,
  useDatabase,
  useDatabaseObjectData,
  useSigninCheck
} from 'reactfire'
import { ref } from 'firebase/database'
import { Button, Result, Spin } from 'antd'
import Styled from './components/Styled'
import ListComponent from '../List/List'
import { BoardContext } from './components/BoardContext'
import PermissionProvider from '@/containers/Permission/PermissionProvider'
import CreateListColumn from './components/CreateListColumn'
import Restricted from '@/containers/Permission/Restricted'
import { Board, UserPermissionRole } from '@/types'
import { handleDragEvent, sortByPosition } from './utils'
import { updateBoard } from '~/lib/api/boards'
import BoardHeader from './components/BoardHeader'

const BoardComponent: React.FunctionComponent = () => {
  const navigate = useNavigate()
  const params = useParams()
  const db = useDatabase()
  const auth = useSigninCheck()

  const board: ObservableStatus<Board> =
    useDatabaseObjectData(
      ref(db, `boards/${params.boardId}`),
      {
        idField: 'id'
      }
    )

  const [state, setState] = useState<Board>(board.data)
  const [userRole, setUserRole] =
    useState<UserPermissionRole>(null)

  if (board.status === 'loading') return <Spin />

  if (!board.data) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="This isn't the board you're looking for"
        extra={
          <Button
            type="primary"
            onClick={() => navigate('/')}
          >
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
        if (
          Object.keys(board.data.members).includes(
            auth.data.user.uid
          )
        ) {
          return setUserRole(
            board.data.members[auth.data.user.uid].role
          )
        }
      }
    }

    return setUserRole(null)
  }, [auth.data])

  const renderLists = () => {
    if (state.lists) {
      return sortByPosition(state.lists).map((list) => (
        <ListComponent key={list.id} list={list} />
      ))
    }
  }

  const onDragEnd = async (event) => {
    const updatedBoard = handleDragEvent(event, state)

    setState(updatedBoard)
    updateBoard({ board: board.data }, updatedBoard)
  }

  return (
    <PermissionProvider role={userRole}>
      <BoardContext.Provider value={state}>
        <Styled.BoardContainer
          backgroundColor={state.color}
        >
          <BoardHeader />
          <Styled.Content>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable
                droppableId={params.boardId}
                type="LIST"
                direction="horizontal"
              >
                {(droppableProvided) => (
                  <Styled.ListsContainer
                    flex
                    ref={droppableProvided.innerRef}
                    {...droppableProvided.droppableProps}
                  >
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
