import React, { useContext, useEffect, useRef, useState } from 'react'
import Styled from './components/Styled'
import ItemToolbar from './components/ItemToolbar'
import { Draggable } from 'react-beautiful-dnd'
import { ItemContext } from './components/ItemContext'
import { usePermission } from '@/hooks'
import { Board, Item, List } from '@/types'
import { Input } from 'antd'
import useOnClickOutside from '@/hooks/useOnClickOutside'
import { BoardContext } from '../Board/components/BoardContext'
import { ListContext } from '../List/components/ListContext'
import { updateItem } from '~/lib/api/items'

type Props = {
  item: Item
  index: number
}

const ItemComponent: React.FunctionComponent<Props> = (props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(props.item.content)
  const canEdit = usePermission('item:edit')
  const clickOutsideRef = useRef()
  const board: Board = useContext(BoardContext)
  const list = useContext(ListContext)

  const startEditing = () => {
    if (!canEdit) return

    setIsEditing(true)
  }
  
  const stopEditing = () => {
    setIsEditing(false)
    
    if (content !== props.item.content) {
      updateItem({ board, list, item: props.item }, { content })
    }
  }

  useOnClickOutside(clickOutsideRef, () => {
    if (isEditing) {
      stopEditing()
    }
  })

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
            <Styled.Content ref={clickOutsideRef} itemColor={props.item.color} onDoubleClick={startEditing}>
              {
                canEdit && !isEditing ? <ItemToolbar item={props.item} /> : null
              }

              {
                canEdit && isEditing ?
                  <Input.TextArea
                    style={{
                      padding: 0,
                      minHeight: 'min-content'
                    }}
                    autoSize={true}
                    autoFocus={true}
                    onInput={(event) => setContent(event.target.value)}
                    onPressEnter={stopEditing}
                    onFocus={(event) => {
                      // Forces focus to end of content
                      const value = event.target.value
                      event.target.value = ''
                      event.target.value = value
                    }}
                    bordered={false}
                    value={content}
                  />
                : <div>{content}</div>
              }

            </Styled.Content>
          </Styled.Container>
        )}
      </Draggable>
    </ItemContext.Provider>
  )
}

export default ItemComponent
