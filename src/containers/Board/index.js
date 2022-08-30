import React, { useState } from 'react'
import styled from 'styled-components'
import { CreateListModal } from '../../components/List'
import Lists from '../Lists'
import { useParams, useNavigate } from 'react-router'
import { Empty, Button, Result, PageHeader } from 'antd'
import Spin from '../../components/Spin'
import BoardSettingsDrawer from './components/BoardSettingsDrawer'
import UserToolbar from './components/UserToolbar'
import { useDatabase, useDatabaseListData } from 'reactfire'
import { ref } from '@firebase/database'
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

  const boardQuery = ref(db, `boards/${params.boardId}`)
  const listsQuery = ref(db, `lists/${params.boardId}`)

  const { status: boardStatus, data: board } = useDatabaseListData(boardQuery, {
    idField: 'id'
  })
  const { status: listStatus, data: lists } = useDatabaseListData(listsQuery, {
    idField: 'id'
  })

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

  const renderLists = () => {
    if (listStatus === 'loading') return <Spin />

    if (lists.length)
      return (
        <Lists
          lists={lists}
          board={{
            id: params.boardId,
            ...board
          }}
        />
      )

    return (
      <Empty description="There's nothing here" image={Empty.PRESENTED_IMAGE_SIMPLE}>
        {/* {!isEmpty(auth) && (
          <Button onClick={() => setCreateListModalVisible(true)} type="primary">
            Create List
          </Button>
        )} */}
      </Empty>
    )
  }

  if (boardStatus === 'loading') return <Spin />

  if (!board) {
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
      <PageHeader title={board.title} extra={<UserToolbar onClick={handleToolbarClick} />} />

      <Styled.Content>{renderLists()}</Styled.Content>

      <CreateListModal
        visible={createListModalVisible}
        close={() => setCreateListModalVisible(false)}
        board={{
          ...board,
          id: params.boardId
        }}
      />

      <BoardSettingsDrawer
        board={{
          ...board,
          id: params.boardId
        }}
        visible={boardSettingsVisible}
        close={() => setBoardSettingsVisible(false)}
      />
    </Styled.Container>
  )
}

export default Board
