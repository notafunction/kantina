import React, { useState } from 'react'
import _sortBy from 'lodash.sortby'
import PropTypes from 'prop-types'
import { Droppable } from 'react-beautiful-dnd'
import Item from '../Item/Item'
import ListToolbar from './components/ListToolbar'
import { useSigninCheck } from 'reactfire'
import Styled from './components/Styled'
import { Button } from 'antd'
import CreateItemModal from './components/CreateItemModal'
import { ListContext } from './components/ListContext'

const List = (props) => {
  const auth = useSigninCheck()

  const [createItemVisible, setCreateItemVisible] = useState(false)

  const renderItems = () => {
    if (props.list.items) {
      return _sortBy(props.list.items, (o) => o.position).map((item, index) => (
        <Item item={item} key={item.id} index={index} />
      ))
    }
  }

  return (
    <ListContext.Provider value={props.list}>
      <Droppable droppableId={props.list.id} type="ITEM">
        {(provided, _snapshot) => (
          <Styled.Content backgroundColor={props.list.color}>
            <Styled.Header>
              <h3 {...props.dragHandleProps}>{props.list.id}</h3>
              <ListToolbar />
            </Styled.Header>
            <Styled.Dropzone ref={provided.innerRef}>
              {renderItems()}
              {provided.placeholder}
            </Styled.Dropzone>
            {auth.status === 'success' && auth.data.signedIn ? (
              <Button type="text" onClick={() => setCreateItemVisible(true)} className="mt-auto">
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
  list: PropTypes.object.isRequired,
  dragHandleProps: PropTypes.object
}

export default List
