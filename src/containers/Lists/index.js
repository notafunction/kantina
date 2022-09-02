/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import List from '../List'
import PropTypes from 'prop-types'
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd'
import { useParams } from 'react-router'
import { arrayMoveImmutable } from 'array-move'
import Container from '../../components/Container'
import { useDatabase, useDatabaseObjectData, useSigninCheck } from 'reactfire'
import { query, ref, set, remove, get, child, orderByChild, push } from 'firebase/database'
import { Spin } from 'antd'

const ListWrapper = styled.div`
  flex-shrink: 0;
  margin: 0 5px;
  height: 100%;
  width: 270px;
  vertical-align: top;
`

const Lists = (props) => {
  const params = useParams()
  const db = useDatabase()
  const { status: signinCheckStatus, data: signinCheckData } = useSigninCheck()
  const boardLists = useDatabaseObjectData(ref(db, `boards/${params.boardId}/lists`), {
    idField: false
  })

  const [lists, setLists] = useState([])

  useEffect(() => {
    if (boardLists.status === 'loading') return
    if (boardLists.data === null) return

    const fetchData = async () => {
      const listIds = Object.keys(boardLists.data)

      const lists = await Promise.all(
        listIds.map(async (id) => {
          const snap = await get(ref(db, `lists/${id}`))

          if (snap.exists()) {
            return {
              id,
              ...snap.val()
            }
          }
        })
      )

      setLists(lists)
    }

    fetchData().catch(console.error)
  }, [boardLists])

  const onDragEnd = async ({ source, destination, draggableId, ...result }) => {
    switch (
      result.type
      // case 'LIST': {
      //   const updatedLists = arrayMoveImmutable(
      //     props.lists,
      //     source.index,
      //     destination.index
      //   ).reduce(
      //     (lists, list, index) => ({
      //       ...lists,
      //       [list.id]: {
      //         ...list,
      //         order: index
      //       }
      //     }),
      //     {}
      //   )

      //   set(ref(db, `lists/${params.boardId}`), updatedLists)
      //   break
      // }

      // case 'ITEM': {
      //   if (!destination) return

      //   if (source.droppableId === destination.droppableId) {
      //     if (source.index === destination.index) return

      //     const items = (await get(child(ref(db), `items/${destination.droppableId}`))).val()

      //     const itemIDsByOrder = arrayMoveImmutable(
      //       Object.keys(items),
      //       source.index,
      //       destination.index
      //     )

      //     const updatedItems = itemIDsByOrder.reduce(
      //       (_items, id, index) => ({
      //         ..._items,
      //         [id]: {
      //           ...items[id],
      //           order: index
      //         }
      //       }),
      //       {}
      //     )

      //     set(ref(db, `items/${destination.droppableId}`), updatedItems)
      //     return
      //   }

      //   const destinationItems = (
      //     await get(query(ref(db, `items/${destination.droppableId}`), orderByChild('order')))
      //   ).val()

      //   if (!destinationItems) {
      //     const sourceItem = (
      //       await get(ref(db, `items/${source.droppableId}/${source.draggableId}`))
      //     ).val()

      //     push(ref(db, `items/${destination.droppableId}`), {
      //       ...sourceItem,
      //       order: 0
      //     })
      //   }

      //   // Squeeze item into destination items array at index and reduce into object for firebase update
      //   const updatedItemsByKey = [
      //     ...(items[destination.droppableId]
      //       ? items[destination.droppableId].slice(0, destination.index)
      //       : []),
      //     items[source.droppableId][source.index],
      //     ...(items[destination.droppableId]
      //       ? items[destination.droppableId].slice(destination.index)
      //       : [])
      //   ].reduce(
      //     (items, item, index) => ({
      //       ...items,
      //       [item.id]: {
      //         ...item,
      //         order: index
      //       }
      //     }),
      //     {}
      //   )

      //   remove(ref(db, `items/${source.droppableId}/${draggableId}`))
      //   set(ref(db, `items/${destination.droppableId}`), updatedItemsByKey)
      //   break
      // }
    ) {
    }
  }

  console.log('lists', lists)

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={params.boardId} type="LIST" direction="horizontal">
        {(droppableProvided, droppableSnapshot) => (
          <Container flex ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
            {lists.map((list, i) => (
              <Draggable
                key={i}
                index={i}
                draggableId={list.id}
                isDragDisabled={!signinCheckData.signedIn}>
                {(draggableProvided, draggableSnapshot) => (
                  <ListWrapper
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}>
                    <List
                      list={list}
                      dragHandleProps={draggableProvided.dragHandleProps}
                      isDragging={draggableSnapshot.isDragging}
                    />
                  </ListWrapper>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
}

Lists.propTypes = {}

export default Lists
