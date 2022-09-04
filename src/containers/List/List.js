import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import { Droppable } from 'react-beautiful-dnd'
import Item from '../Item/Item'
import ListToolbar from './components/ListToolbar'
import { useDatabase, useDatabaseObjectData } from 'reactfire'
import Styled from './components/Styled'
import { ref } from 'firebase/database'
import { Spin } from 'antd'

export const ListContext = createContext()

const List = (props) => {
  const db = useDatabase()
  const list = useDatabaseObjectData(ref(db, `lists/${props.id}`), { idField: 'id' })

  if (list.status === 'loading') return <Spin />

  const renderItem = (id, props) => <Item key={id} id={id} {...props} />

  return (
    <ListContext.Provider value={list.data}>
      <Droppable droppableId={list.data.id} type="ITEM">
        {(provided, _snapshot) => (
          <Styled.Content {...provided.droppableProps} itemColor={list.data.color}>
            <Styled.Header>
              <h3 {...props.dragHandleProps}>{list.data.title}</h3>
              <ListToolbar list={list.data} />
            </Styled.Header>
            <Styled.Dropzone ref={provided.innerRef}>
              {Object.keys(list.data.items).map((id) =>
                renderItem(id, {
                  list: list.data,
                  provided
                })
              )}
              {provided.placeholder}
            </Styled.Dropzone>
          </Styled.Content>
        )}
      </Droppable>
    </ListContext.Provider>
  )
}

List.propTypes = {
  id: PropTypes.string.isRequired,
  dragHandleProps: PropTypes.object,
  isDragging: PropTypes.bool.isRequired
}

export default List
