import React, { useContext, useRef, useState } from 'react'
import ListToolbar from './ListToolbar'
import Styled from './Styled'
import { ListContext } from './ListContext'
import type { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd'
import usePermission from '~/src/hooks/usePermission'
import { db } from '~/lib/firebase'
import useOnClickOutside from '~/src/hooks/useOnClickOutside'
import { ref, set } from 'firebase/database'
import { BoardContext } from '../../Board/components/BoardContext'
import { Input } from 'antd'

type Props = {
  dragHandleProps: DraggableProvidedDragHandleProps
}

const ListHeader: React.FunctionComponent<Props> = (props) => {
  const [isEditing, setIsEditing] = useState(false)
  const board = useContext(BoardContext)
  const list = useContext(ListContext)
  const [title, setTitle] = useState(list.title)
  const canEdit = usePermission('list:edit')
  const clickOutsideRef = useRef()

  const startEditing = () => {
    if (!canEdit) return
    setIsEditing(true)
  }

  const stopEditing = () => {
    setIsEditing(false)

    if (title !== list.title) {
      set(ref(db, `boards/${board.id}/lists/${list.id}/title`), title)
    }
  }

  useOnClickOutside(clickOutsideRef, () => {
    if (isEditing) {
      stopEditing()
    }
  })


  return (
    <Styled.Header ref={clickOutsideRef} onDoubleClick={startEditing}>
      {
        canEdit && isEditing ?
        <Input autoFocus={true}
          className="p-0 font-semibold text-lg"
          onInput={(event) => setTitle(event.target.value)}
          onPressEnter={stopEditing}
          bordered={false}
          value={title}
          onFocus={(event) => {
            // Forces focus to end of content
            const value = event.target.value
            event.target.value = ''
            event.target.value = value
          }}
        />
        : <h3 {...props.dragHandleProps}>{title}</h3>
      }
      <ListToolbar />
    </Styled.Header>
  )
}

export default ListHeader