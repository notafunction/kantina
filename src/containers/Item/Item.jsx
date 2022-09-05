import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import Styled from './components/Styled'
import ItemToolbar from './components/ItemToolbar'
import { useDatabase, useDatabaseObjectData, useSigninCheck } from 'reactfire'
import { ref } from 'firebase/database'
import { Spin } from 'antd'
import { Draggable } from 'react-beautiful-dnd'
import { BoardContext } from '../Board/Board'
import { ListContext } from '../List/List'

export const ItemContext = createContext()

const Item = (props) => {
  const auth = useSigninCheck()
  const db = useDatabase()
  const board = useContext(BoardContext)
  const list = useContext(ListContext)
  const item = useDatabaseObjectData(
    ref(db, `boards/${board.id}/lists/${list.id}/items/${props.id}`),
    {
      idField: 'id'
    }
  )

  if (item.status === 'loading') {
    return <Spin />
  }

  if (item.data === null) {
    return null
  }

  return (
    <ItemContext.Provider value={item.data}>
      <Draggable
        key={props.id}
        index={props.index}
        draggableId={props.id}
        isDragDisabled={auth.status !== 'success' || !auth.data.signedIn}>
        {(draggableProvided, _draggableSnapshot) => (
          <Styled.Container
            backgroundColor={item.data.color}
            ref={draggableProvided.innerRef}
            {...draggableProvided.draggableProps}
            {...draggableProvided.dragHandleProps}>
            <Styled.Content isDragging={draggableProvided.isDragging} itemColor={item.data.color}>
              <ItemToolbar item={item.data} />
              <div>{item.data.id}</div>
            </Styled.Content>
          </Styled.Container>
        )}
      </Draggable>
    </ItemContext.Provider>
  )
}

Item.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
}

export default Item
