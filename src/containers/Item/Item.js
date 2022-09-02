import React from 'react'
import PropTypes from 'prop-types'
import Styled from './components/Styled'
import ItemToolbar from './components/ItemToolbar'
import { useDatabase, useDatabaseObjectData } from 'reactfire'
import { ref } from 'firebase/database'
import { Spin } from 'antd'
import { useDrag } from 'react-dnd'
import { DndItemTypes } from '../Dnd/Dnd'

const Item = (props) => {
  const db = useDatabase()
  const item = useDatabaseObjectData(ref(db, `items/${props.item.id}`), {
    idField: 'id'
  })

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DndItemTypes.ITEM,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  if (item.status === 'loading') return <Spin />

  return (
    <Styled.Container
      style={{
        backgroundColor: item.data.color
      }}>
      <Styled.Content itemColor={item.data.color}>
        <ItemToolbar item={item.data} list={props.list} />
        <div>{item.data.content}</div>
      </Styled.Content>
    </Styled.Container>
  )
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired
}

export default Item
