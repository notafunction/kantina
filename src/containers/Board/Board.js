import React, { useState } from 'react'
import styled from 'styled-components'
import { CreateListModal } from '../../components/List'
import Lists from '../Lists/Lists'
import { useParams, useNavigate } from 'react-router'
import { Button, Result, PageHeader, Spin } from 'antd'
import BoardSettingsDrawer from './components/BoardSettingsDrawer'
import UserToolbar from './components/UserToolbar'
import { useDatabase, useDatabaseObjectData } from 'reactfire'
import { ref } from 'firebase/database'
import tw from 'twin.macro'

const Styled = {
  Container: styled.div`
    ${tw`h-full flex flex-col`}
  `,

  Content: styled.div`
    ${tw`relative flex-1`}
  `
}

const Board = () => {
  const navigate = useNavigate()
  const params = useParams()
  const db = useDatabase()

  const board = useDatabaseObjectData(ref(db, `boards/${params.boardId}`), {
    idField: 'id'
  })

  console.log(board)

  const [boardSettingsVisible, setBoardSettingsVisible] = useState(false)
  const [createListModalVisible, setCreateListModalVisible] = useState(false)

  const handleToolbarClick = (event) => {
    switch (event.key) {
      case 'list:create': {
        setCreateListModalVisible(true)
        break
      }
      case 'board:settings': {
        setBoardSettingsVisible(true)
      }
    }
  }

  if (board.status === 'loading') return <Spin />

  if (!board.data) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="This isn't the board you're looking for"
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            Back Home
          </Button>
        }
      />
    )
  }

  return (
    <Styled.Container>
      <PageHeader title={board.data.title} extra={<UserToolbar onClick={handleToolbarClick} />} />

      <Styled.Content>
        <Lists />
      </Styled.Content>

      <CreateListModal
        visible={createListModalVisible}
        close={() => setCreateListModalVisible(false)}
        board={board.data}
      />

      <BoardSettingsDrawer
        board={board.data}
        visible={boardSettingsVisible}
        close={() => setBoardSettingsVisible(false)}
      />
    </Styled.Container>
  )
}

export default Board
