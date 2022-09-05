import React, { useEffect, useState } from 'react'
import _sortBy from 'lodash.sortby'
import { arrayMoveImmutable } from 'array-move'
import ihUpdate from 'immutability-helper'
import { CreateListModal } from '../../components/List'
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd'
import { useParams, useNavigate } from 'react-router'
import { useDatabase, useDatabaseObjectData, useSigninCheck } from 'reactfire'
import { ref, runTransaction, set } from 'firebase/database'
import { Button, Result, PageHeader, Spin, message } from 'antd'
import Styled from './components/Styled'
import List from '../List/List'
import BoardSettingsDrawer from './components/BoardSettingsDrawer'
import UserToolbar from './components/UserToolbar'
import { BoardContext } from './components/BoardContext'

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
  const [state, setState] = useState({})

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

  const renderLists = () => {
    if (state.lists) {
      return _sortBy(state.lists, (o) => o.position).map((list, index) => (
        <Draggable
          key={list.id}
          index={index}
          draggableId={list.id}
          isDragDisabled={auth.status !== 'success' || !auth.data.signedIn}>
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
    <BoardContext.Provider value={state}>
      <Styled.BoardContainer>
        <PageHeader title={state.title} extra={<UserToolbar onClick={handleToolbarClick} />} />

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
