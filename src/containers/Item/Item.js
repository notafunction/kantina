import React from 'react'
import PropTypes from 'prop-types'
import Styled from './components/Styled'
import ItemToolbar from './components/ItemToolbar'
import { useDatabase, useDatabaseObjectData } from 'reactfire'
import { ref } from 'firebase/database'
import { Spin } from 'antd'

const Item = (props) => {
  const db = useDatabase()
  const item = useDatabaseObjectData(ref(db, `items/${props.id}`), {
    idField: 'id'
  })

  if (item.status === 'loading') {
    return <Spin />
  }

  return (
    <Styled.Container
      style={{
        backgroundColor: item.data.color
      }}
      ref={props.provided.innerRef}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}>
      <Styled.Content isDragging={props.provided.isDragging} itemColor={item.data.color}>
        <ItemToolbar item={item.data} list={props.list} />
        <div>{item.data.content}</div>
      </Styled.Content>
    </Styled.Container>
  )
}

Item.propTypes = {
  id: PropTypes.string.isRequired,
  list: PropTypes.object.isRequired,
  provided: PropTypes.object.isRequired
}

export default Item
