import React, { useContext, useEffect, useRef, useState } from 'react'
import Styled from './Styled'
import { Button, Input, Tooltip } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { db } from '~/lib/firebase'
import { push, ref, update } from 'firebase/database'
import { BoardContext } from '../../Board/components/BoardContext'
import { ListContext } from './ListContext'
import { AuthContext } from '../../Auth/components/AuthContext'
import useOnClickOutside from '~/src/hooks/useOnClickOutside'

const ListFooter = (props) => {
  const board = useContext(BoardContext)
  const list = useContext(ListContext)
  const { user } = useContext(AuthContext)
  const clickOutsideRef = useRef()
  const [isAdding, setIsAdding] = useState(false)
  const [newItemContent, setNewItemContent] = useState('')

  useOnClickOutside(clickOutsideRef, () => setIsAdding(false))

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setIsAdding(false)
      }
    }

    window.addEventListener('keydown', handleEsc)

    return () => window.removeEventListener('keydown', handleEsc)
  })

  const addItem = () => {
    const itemRef = push(ref(db, `boards/${board.id}/lists/${list.id}/items`), {
      content: newItemContent,
      createdBy: user.uid,
      list: list.id,
      position: list.items ? Object.keys(list.items).length : 0
    })

    update(itemRef, {
      id: itemRef.key
    })

    setNewItemContent('')
  }

  return (
    <Styled.Footer className="justify-end flex-wrap" ref={clickOutsideRef}>
      {
        isAdding && 
        <Input
          autoFocus
          className="basis-full"
          value={newItemContent}
          onInput={(event) => setNewItemContent(event.target.value)}
          onPressEnter={addItem}
          
        />
      }

      <Tooltip title="Add Item">
        <Button type="text" icon={<PlusOutlined />} onClick={() => setIsAdding(true)} />
      </Tooltip>
    </Styled.Footer>
  )
}

export default ListFooter