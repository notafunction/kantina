import React, { useEffect, useState } from 'react'
import _sortBy from 'lodash.sortby'
import { arrayMoveImmutable } from 'array-move'
import { CreateListModal } from '../../components/List'
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd'
import { useParams, useNavigate } from 'react-router'
import { useDatabase, useDatabaseObjectData, useSigninCheck } from 'reactfire'
import { ref, remove, update } from 'firebase/database'
import { Button, Result, PageHeader, Spin } from 'antd'
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

  const [lists, setLists] = useState([])
  const [items, setItems] = useState([])

  useEffect(() => {
    if (board.status === 'success') {
      if (board.data.lists) {
        setLists(_sortBy(board.data.lists, (o) => o.position))
      }
    }
  }, [board.data])

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
    if (lists.length) {
      return lists.map((list, index) => (
        <Draggable
          key={list.id}
          index={index}
          draggableId={list.id}
          isDragDisabled={auth.status !== 'success' || !auth.data.signedIn}>
          {(draggableProvided, _draggableSnapshot) => (
            <Styled.ListWrapper
              ref={draggableProvided.innerRef}
              {...draggableProvided.draggableProps}>
              <List id={list.id} dragHandleProps={draggableProvided.dragHandleProps} />
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

          const items = _sortBy(board.data.lists[source.droppableId].items, (o) => o.position)

          const updatedItems = arrayMoveImmutable(items, source.index, destination.index)

          updatedItems.forEach((item, index) => {
            update(
              ref(db, `boards/${board.data.id}/lists/${source.droppableId}/items/${item.id}`),
              {
                position: index
              }
            )
          })
        } else {
          const sourceItemRef = ref(
            db,
            `boards/${board.data.id}/lists/${source.droppableId}/items/${draggableId}`
          )

          const destinationItems = _sortBy(
            board.data.lists[destination.droppableId].items,
            (o) => o.position
          )

          const updatedDestinationItems = [
            ...(destinationItems ? destinationItems.slice(0, destination.index) : []),
            board.data.lists[source.droppableId].items[draggableId],
            ...(destinationItems ? destinationItems.slice(destination.index) : [])
          ]

          updatedDestinationItems.forEach((item, index) => {
            update(
              ref(db, `boards/${board.data.id}/lists/${destination.droppableId}/items/${item.id}`),
              {
                position: index
              }
            )
          })
          remove(sourceItemRef)
        }

        break
      }

      case 'LIST': {
        const updatedLists = arrayMoveImmutable(lists, source.index, destination.index)

        setLists(updatedLists)

        updatedLists.forEach((list, index) => {
          update(ref(db, `boards/${board.data.id}/lists/${list.id}`), {
            position: index
          })
        })
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
