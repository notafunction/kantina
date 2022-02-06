/* eslint-disable no-unused-vars */
import React from 'react'
import styled from 'styled-components'
import List from './List'
import PropTypes from 'prop-types'
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd'
import { useParams } from 'react-router'
import { isEmpty, useFirebase } from 'react-redux-firebase'
import { arrayMoveImmutable } from 'array-move'
import { useSelector } from 'react-redux'
import Container from '../components/Container'

const ListWrapper = styled.div`
  flex-shrink: 0;
  margin: 0 5px;
  height: 100%;
  width: 270px;
  vertical-align: top;
`

const Lists = (props) => {
  const firebase = useFirebase()
  const params = useParams()
  const items = useSelector(
    ({
      firebase: {
        ordered: { items }
      }
    }) => items
  )
  const auth = useSelector(({ firebase: { auth } }) => auth)

  const onDragEnd = ({ source, destination, draggableId, ...result }) => {
    switch (result.type) {
      case 'LIST': {
        firebase.ref(`lists/${params.boardId}`).update(
          arrayMoveImmutable(props.lists, source.index, destination.index).reduce(
            (prev, current, index) => ({
              ...prev,
              [current.key]: {
                ...current.value,
                order: index
              }
            }),
            {}
          )
        )
        break
      }
      case 'ITEM': {
        if (!destination) return // If dropped outside of <Droppable type="ITEM">
        if (source.droppableId === destination.droppableId) {
          if (source.index === destination.index) return // If dropped into same position

          const updatedItemsByKey = arrayMoveImmutable(
            items[destination.droppableId],
            source.index,
            destination.index
          ).reduce(
            (prev, current, index) => ({
              ...prev,
              [current.key]: {
                ...current.value,
                order: index
              }
            }),
            {}
          )

          firebase.ref(`items/${destination.droppableId}`).update(updatedItemsByKey)
          return
        }

        const sourceItemsRef = firebase.ref(`items/${source.droppableId}`)
        const destinationItemsRef = firebase.ref(`items/${destination.droppableId}`)

        // Squeeze item into destination items array at index and reduce into object for firebase update
        const updatedItemsByKey = [
          ...(items[destination.droppableId]
            ? items[destination.droppableId].slice(0, destination.index)
            : []),
          items[source.droppableId][source.index],
          ...(items[destination.droppableId]
            ? items[destination.droppableId].slice(destination.index)
            : [])
        ].reduce(
          (prev, current, index) => ({
            ...prev,
            [current.key]: {
              ...current.value,
              order: index
            }
          }),
          {}
        )

        sourceItemsRef.child(draggableId).remove()
        destinationItemsRef.update(updatedItemsByKey)
        break
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={props.board.id} type="LIST" direction="horizontal">
        {(droppableProvided) => (
          <Container flex ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
            {props.lists.map((list, i) => (
              <Draggable
                key={list.key}
                index={i}
                draggableId={list.key}
                isDragDisabled={isEmpty(auth)}>
                {(draggableProvided, draggableSnapshot) => (
                  <ListWrapper
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}>
                    <List
                      list={{
                        id: list.key,
                        ...list.value
                      }}
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

Lists.propTypes = {
  board: PropTypes.object.isRequired,
  lists: PropTypes.array.isRequired
}

export default Lists
