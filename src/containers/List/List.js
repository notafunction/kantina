import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import { Droppable } from 'react-beautiful-dnd'
import Item from '../Item/Item'
import ListToolbar from './components/ListToolbar'
import { useDatabase, useDatabaseObjectData, useSigninCheck } from 'reactfire'
import Styled from './components/Styled'
import { ref } from 'firebase/database'
import { Button, Spin } from 'antd'
import CreateItemModal from './components/CreateItemModal'

export const ListContext = createContext()

const List = (props) => {
  const auth = useSigninCheck()
  const db = useDatabase()
  const list = useDatabaseObjectData(ref(db, `lists/${props.id}`), { idField: 'id' })

  const [createItemVisible, setCreateItemVisible] = useState(false)

  if (list.status === 'loading') return <Spin />

  if (list.data === null) return null

  const renderItems = () => {
    if (list.data.items) {
      return Object.keys(list.data.items).map((id, index) => (
        <Item key={id} id={id} index={index} />
      ))
    }
  }

  return (
    <ListContext.Provider value={list.data}>
      <Droppable droppableId={list.data.id} type="ITEM">
        {(provided, _snapshot) => (
          <Styled.Content backgroundColor={list.data.color}>
            <Styled.Header>
              <h3 {...props.dragHandleProps}>{list.data.id}</h3>
              <ListToolbar list={list.data} />
            </Styled.Header>
            <Styled.Dropzone ref={provided.innerRef}>
              {renderItems()}
              {provided.placeholder}
            </Styled.Dropzone>

            {auth.status === 'success' && auth.data.signedIn ? (
              <Button type="text" onClick={() => setCreateItemVisible(true)}>
                Add Item
                <CreateItemModal
                  visible={createItemVisible}
                  close={() => setCreateItemVisible(false)}
                />
              </Button>
            ) : null}
          </Styled.Content>
        )}
      </Droppable>
    </ListContext.Provider>
  )
}

List.propTypes = {
  id: PropTypes.string.isRequired,
  dragHandleProps: PropTypes.object
}

export default List
