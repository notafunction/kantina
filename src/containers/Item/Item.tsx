import React from 'react'
import Styled from './components/Styled'
import ItemToolbar from './components/ItemToolbar'
import { Draggable } from 'react-beautiful-dnd'
import { ItemContext } from './components/ItemContext'
import { usePermission } from '@/hooks'
import { Item } from '@/types'

type Props = {
  item: Item
  index: number
}

const ItemComponent: React.FunctionComponent<Props> = (props) => {
  const canEdit = usePermission('item:edit')

  return (
    <ItemContext.Provider value={props.item}>
      <Draggable
        key={props.item.id}
        index={props.index}
        draggableId={props.item.id}
        isDragDisabled={!canEdit}>
        {(draggableProvided, draggableSnapshot) => (
          <Styled.Container
            backgroundColor={props.item.color}
            ref={draggableProvided.innerRef}
            {...draggableProvided.draggableProps}
            {...draggableProvided.dragHandleProps}
            {...draggableSnapshot}>
            <Styled.Content itemColor={props.item.color}>
              {
                canEdit && <ItemToolbar item={props.item} />
              }
              <div>{props.item.content}</div>
            </Styled.Content>
          </Styled.Container>
        )}
      </Draggable>
    </ItemContext.Provider>
  )
}

export default ItemComponent
