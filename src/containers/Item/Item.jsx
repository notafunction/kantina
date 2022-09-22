import React from 'react'
import PropTypes from 'prop-types'
import Styled from './components/Styled'
import ItemToolbar from './components/ItemToolbar'
import { useSigninCheck } from 'reactfire'
import { Draggable } from 'react-beautiful-dnd'
import { ItemContext } from './components/ItemContext'

const Item = (props) => {
  const auth = useSigninCheck()

  return (
    <ItemContext.Provider value={props.item}>
      <Draggable
        key={props.item.id}
        index={props.index}
        draggableId={props.item.id}
        isDragDisabled={auth.status !== 'success' || !auth.data.signedIn}>
        {(draggableProvided, draggableSnapshot) => (
          <Styled.Container
            backgroundColor={props.item.color}
            ref={draggableProvided.innerRef}
            {...draggableProvided.draggableProps}
            {...draggableProvided.dragHandleProps}
            {...draggableSnapshot}>
            <Styled.Content itemColor={props.item.color}>
              <ItemToolbar item={props.item} />
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
