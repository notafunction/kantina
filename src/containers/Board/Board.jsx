import React, { useEffect, useState } from 'react'
import _sortBy from 'lodash.sortby'
import { arrayMoveImmutable } from 'array-move'
import ihUpdate from 'immutability-helper'
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd'
import { useParams, useNavigate } from 'react-router'
import { useDatabase, useDatabaseObjectData, useSigninCheck } from 'reactfire'
import { ref, runTransaction, set } from 'firebase/database'
import { Button, Result, PageHeader, Spin, message } from 'antd'
import Styled from './components/Styled'
import List from '../List/List'
import { BoardContext } from './components/BoardContext'
import PermissionProvider from '@/containers/Permission/PermissionProvider'
import BoardToolbar from './components/BoardToolbar'
import CreateListColumn from './components/CreateListColumn'
import Restricted from '@/containers/Permission/Restricted'
import { usePermission } from '../../hooks'

const Board = () => {
  const navigate = useNavigate()
  const params = useParams()
  const db = useDatabase()
  const auth = useSigninCheck()
  const canEditLists = usePermission('list:edit')

  const board = useDatabaseObjectData(ref(db, `boards/${params.boardId}`), {
    idField: 'id'
  })

  const [state, setState] = useState({})
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
    if (state.lists) {
      return _sortBy(state.lists, (o) => o.position).map((list, index) => (
        <Draggable key={list.id} index={index} draggableId={list.id} isDragDisabled={!canEditLists}>
          {(draggableProvided, _draggableSnapshot) => (
            <Styled.ListWrapper
              ref={draggableProvided.innerRef}
              {...draggableProvided.draggableProps}>
              <List list={list} dragHandleProps={draggableProvided.dragHandleProps} />
            </Styled.ListWrapper>
          )}
        </Draggable>
      ))
    }
  }

  const onDragEnd = async (event) => {
    const { type, destination, source, draggableId } = event

    switch (type) {
      case 'ITEM': {
        if (!destination) return
        if (source.droppableId === destination.droppableId) {
          if (source.index === destination.index) return

          const updatedItems = arrayMoveImmutable(
            _sortBy(board.data.lists[source.droppableId].items, (o) => o.position),
            source.index,
            destination.index
          )

          const updatedItemsPayload = updatedItems.reduce(
            (payload, item, index) => ({
              ...payload,
              [item.id]: {
                ...item,
                position: index
              }
            }),
            {}
          )

          set(
            ref(db, `boards/${board.data.id}/lists/${source.droppableId}/items`),
            updatedItemsPayload
          )

          setState((state) => {
            return ihUpdate(state, {
              lists: {
                [destination.droppableId]: {
                  items: {
                    $set: updatedItemsPayload
                  }
                }
              }
            })
          })
        } else {
          const prevState = state

          const updatedSourceItems = _sortBy(
            state.lists[source.droppableId].items,
            (o) => o.position
          ).filter((item) => item.id !== draggableId)

          const updatedSourceItemsPayload = updatedSourceItems.reduce(
            (payload, item, index) => ({
              ...payload,
              [item.id]: {
                ...item,
                position: index
              }
            }),
            {}
          )

          const destinationItems = _sortBy(
            state.lists[destination.droppableId].items,
            (o) => o.position
          )

          const updatedDestinationItems = [
            ...(destinationItems ? destinationItems.slice(0, destination.index) : []),
            state.lists[source.droppableId].items[draggableId],
            ...(destinationItems ? destinationItems.slice(destination.index) : [])
          ]

          const updatedDestinationItemsPayload = updatedDestinationItems.reduce(
            (payload, item, index) => ({
              ...payload,
              [item.id]: {
                ...item,
                position: index
              }
            }),
            {}
          )

          setState((prevState) => {
            return ihUpdate(prevState, {
              lists: {
                [source.droppableId]: {
                  items: {
                    $set: updatedSourceItemsPayload
                  }
                },
                [destination.droppableId]: {
                  items: {
                    $set: updatedDestinationItemsPayload
                  }
                }
              }
            })
          })

          try {
            await runTransaction(ref(db, `boards/${state.id}/lists`), (lists) => {
              return ihUpdate(lists, {
                [source.droppableId]: {
                  items: {
                    $set: updatedSourceItemsPayload
                  }
                },
                [destination.droppableId]: {
                  items: {
                    $set: updatedDestinationItemsPayload
                  }
                }
              })
            })
          } catch (error) {
            console.error(error)
            message.error(error.message)
            setState(prevState)
          }
        }

        break
      }

      case 'LIST': {
        const updatedLists = arrayMoveImmutable(
          _sortBy(state.lists, (o) => o.position),
          source.index,
          destination.index
        )

        const updatedListsPayload = updatedLists.reduce(
          (payload, list, index) => ({
            ...payload,
            [list.id]: {
              ...list,
              position: index
            }
          }),
          {}
        )

        const prevState = state

        setState((prevState) => {
          return ihUpdate(prevState, {
            lists: {
              $set: updatedListsPayload
            }
          })
        })

        try {
          set(ref(db, `boards/${board.data.id}/lists`), updatedListsPayload)
        } catch (error) {
          console.error(error)
          message.error(error.message)
          setState(prevState)
        }
      }
    }
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

export default Board
