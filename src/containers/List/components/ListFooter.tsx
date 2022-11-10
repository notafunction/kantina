import React, { useContext, useEffect, useRef, useState } from 'react'
import Styled from './Styled'
import { Button, Input, Tooltip } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { BoardContext } from '../../Board/components/BoardContext'
import { ListContext } from './ListContext'
import { AuthContext } from '../../Auth/components/AuthContext'
import useOnClickOutside from '~/src/hooks/useOnClickOutside'
import { createItem } from '~/lib/api/items'

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

  const addItem = async () => {
    await createItem({ board, list }, {
      content: newItemContent,
      createdBy: user.uid,
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