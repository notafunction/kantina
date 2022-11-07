import React, { useState } from 'react'
import _sortBy from 'lodash.sortby'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { DragHandleProps } from 'react-beautiful-dnd/src/view/draggable'
import Item from '../Item/Item'
import ListToolbar from './components/ListToolbar'
import Styled from './components/Styled'
import { Button } from 'antd'
import CreateItemModal from './components/CreateItemModal'
import { ListContext } from './components/ListContext'
import Restricted from '@/containers/Permission/Restricted'
import { List } from '@/types'
import usePermission from '@/hooks/usePermission'

type Props = {
  list: List,
}

const ListComponent: React.FunctionComponent<Props> = (props) => {
  const [createItemVisible, setCreateItemVisible] = useState(false)
  const canEditLists = usePermission('list:edit')

  const renderItems = () => {
    if (props.list.items) {
      return _sortBy(props.list.items, (o) => o.position).map((item, index) => (
        <Item item={item} key={item.id} index={index} />
      ))
    }
  }

  return (
    <ListContext.Provider value={props.list}>
      <Draggable key={props.list.id} index={props.list.position} draggableId={props.list.id} isDragDisabled={!canEditLists}>
          {(draggableProvided, _draggableSnapshot) => (
            <Styled.ListWrapper
              ref={draggableProvided.innerRef}
              {...draggableProvided.draggableProps}>
              <Droppable droppableId={props.list.id} type="ITEM">
                {(provided, _snapshot) => (
                  <Styled.Content backgroundColor={props.list.color}>
                    <Styled.Header>
                      <h3 {...draggableProvided.dragHandleProps}>{props.list.title}</h3>

                      <ListToolbar />
                    </Styled.Header>
                    <Styled.Dropzone ref={provided.innerRef}>
                      {renderItems()}
                      {provided.placeholder}
                    </Styled.Dropzone>
                    <Restricted to="item:create">
                      <div className="mt-auto flex mx-[5px] mb-[5px]">
                        <Button type="ghost" onClick={() => setCreateItemVisible(true)}>
                          Add Item
                        </Button>

                        <CreateItemModal
                          visible={createItemVisible}
                          close={() => setCreateItemVisible(false)}
                        />
                      </div>
                    </Restricted>
                  </Styled.Content>
                )}
              </Droppable>
            </Styled.ListWrapper>
          )}
        </Draggable>
      
    </ListContext.Provider>
  )
}

export default ListComponent