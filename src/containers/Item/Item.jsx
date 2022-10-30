import React from 'react'
import PropTypes from 'prop-types'
import Styled from './components/Styled'
import ItemToolbar from './components/ItemToolbar'
import { Draggable } from 'react-beautiful-dnd'
import { ItemContext } from './components/ItemContext'
import { usePermission } from '@/hooks'
import Restricted from '@/containers/Permission/Restricted'

const Item = (props) => {
  const canEdit = usePermission('board:edit')

  return (
    <ItemContext.Provider value={props.item}>
      <Draggable
        key={props.item.id}
        index={props.index}
        draggableId={props.item.id}
        isDragDisabled={!canEdit}>
        {(draggableProvided, draggableSnapshot) => (
          <Styled.Container
            backgroundColor={props.item.color}
            ref={draggableProvided.innerRef}
            {...draggableProvided.draggableProps}
            {...draggableProvided.dragHandleProps}
            {...draggableSnapshot}>
            <Styled.Content itemColor={props.item.color}>
              <Restricted to="board:edit">
                <ItemToolbar item={props.item} />
              </Restricted>
              <div>{props.item.content}</div>
            </Styled.Content>
          </Styled.Container>
        )}
      </Draggable>
    </ItemContext.Provider>
  )
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}

export default Item
