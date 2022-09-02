import React from 'react'
import PropTypes from 'prop-types'
import { Droppable } from 'react-beautiful-dnd'
import Item from '../Item/Item'
import ListToolbar from './components/ListToolbar'
import { useDatabase, useDatabaseListData } from 'reactfire'
import Styled from './components/Styled'
import { equalTo, orderByChild, query, ref } from 'firebase/database'
import { Spin } from 'antd'

const List = (props) => {
  const db = useDatabase()
  const items = useDatabaseListData(
    query(ref(db, `items`), orderByChild('list'), equalTo(props.list.id)),
    {
      idField: 'id'
    }
  )

  if (items.status === 'loading') return <Spin />

  return (
    <Droppable droppableId={props.list.id} type="ITEM">
      {(provided, _snapshot) => (
        <Styled.Content {...provided.droppableProps} itemColor={props.list.color}>
          <Styled.Header>
            <h3 {...props.dragHandleProps}>{props.list.title}</h3>
            <ListToolbar list={props.list} />
          </Styled.Header>
          <Styled.Dropzone ref={provided.innerRef}>
            {items.data.map((item) => (
              <Item key={item.id} item={item} list={props.list} provided={provided} />
            ))}
            {/* <Items list={props.list} onCreate={() => setCreateItemModalVisible(true)} />
            {provided.placeholder} */}
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
