import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Droppable } from 'react-beautiful-dnd'
import Item from '../Item/Item'
import ListToolbar from './components/ListToolbar'
import { useDatabase, useDatabaseObjectData } from 'reactfire'
import Styled from './components/Styled'
import { ref } from 'firebase/database'
import { Spin } from 'antd'

const List = (props) => {
  const db = useDatabase()
  const itemIds = useDatabaseObjectData(ref(db, `lists/${props.list.id}/items`), { idField: false })

  const renderItem = (id, props) => <Item key={id} id={id} {...props} />

  if (itemIds.status === 'loading') return <Spin />

  return (
    <Droppable droppableId={props.list.id} type="ITEM">
      {(provided, _snapshot) => (
        <Styled.Content {...provided.droppableProps} itemColor={props.list.color}>
          <Styled.Header>
            <h3 {...props.dragHandleProps}>{props.list.title}</h3>
            <ListToolbar list={props.list} />
          </Styled.Header>
          <Styled.Dropzone ref={provided.innerRef}>
            {Object.keys(itemIds.data).map((id) =>
              renderItem(id, {
                list: props.list,
                provided
              })
            )}
            {provided.placeholder}
          </Styled.Dropzone>
        </Styled.Content>
      )}
    </Droppable>
  )
}

List.propTypes = {
  list: PropTypes.object.isRequired,
  dragHandleProps: PropTypes.object,
  isDragging: PropTypes.bool.isRequired
}

export default List
