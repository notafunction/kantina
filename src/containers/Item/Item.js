import React from 'react'
import PropTypes from 'prop-types'
import Styled from './components/Styled'
import ItemToolbar from './components/ItemToolbar'

const Item = (props) => {
  return (
    <Styled.Container
      style={{
        backgroundColor: props.item.color
      }}
      ref={props.provided.innerRef}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}>
      <Styled.Content isDragging={props.provided.isDragging} itemColor={props.item.color}>
        <ItemToolbar item={props.item} list={props.list} />
        <div>{props.item.content}</div>
      </Styled.Content>
    </Styled.Container>
  )
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  provided: PropTypes.object.isRequired
}

export default Item
