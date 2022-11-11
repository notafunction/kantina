import React, { useContext, useRef, useState } from 'react'
import { Input, PageHeader } from 'antd'
import BoardToolbar from './BoardToolbar'
import { BoardContext } from './BoardContext'
import usePermission from '~/src/hooks/usePermission'
import { ref, set } from 'firebase/database'
import { useDatabase } from 'reactfire'
import useOnClickOutside from '~/src/hooks/useOnClickOutside'

type Props = {}

const BoardHeader: React.FunctionComponent<Props> = (
  props
) => {
  const db = useDatabase()
  const board = useContext(BoardContext)
  const canEdit = usePermission('board:edit')
  const [title, setTitle] = useState(board.title)
  const [isEditing, setIsEditing] = useState(false)
  const clickOutsideRef = useRef()

  const startEditing = () => {
    if (!canEdit) return
    setIsEditing(true)
  }

  const stopEditing = () => {
    setIsEditing(false)

    if (title !== board.title) {
      set(ref(db, `boards/${board.id}/title`), title)
    }
  }

  useOnClickOutside(clickOutsideRef, () => {
    if (isEditing) {
      stopEditing()
    }
  })

  const renderTitle = () => {
    if (isEditing) {
      return (
        <Input
          className="p-0 text-xl font-semibold"
          bordered={false}
          value={title}
          onInput={(event) => setTitle(event.target.value)}
        />
      )
    }

    return title
  }

  return (
    <PageHeader
      title={
        <div
          ref={clickOutsideRef}
          onDoubleClick={startEditing}
        >
          {renderTitle()}
        </div>
      }
      extra={<BoardToolbar />}
    />
  )
}

export default BoardHeader
