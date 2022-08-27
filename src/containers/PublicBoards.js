/* eslint-disable no-unused-vars */
import { equalTo, orderByChild, query, ref } from 'firebase/database'
import { Space } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { useDatabase, useDatabaseListData } from 'reactfire'
import styled from 'styled-components'
import BoardTile from '../components/Board/BoardTile'
import Container from '../components/Container'
import StyledSpin from '../components/Spin'

const StyledLink = styled(Link)`
  display: block;
  margin: 0 0.5rem;
`

function PublicBoards() {
  const db = useDatabase()
  const publicBoardsQuery = query(ref(db, 'boards'), orderByChild('type'), equalTo('public'))
  const { status, data: publicBoards } = useDatabaseListData(publicBoardsQuery, {
    idField: 'id'
  })

  console.log(publicBoards)

  if (status === 'loading') return <StyledSpin />

  return (
    <Container flex>
      <Space align="start" wrap>
        {publicBoards.map((board) => (
          <StyledLink to={`/b/${board.id}`} key={board.id}>
            <BoardTile board={board} />
          </StyledLink>
        ))}
      </Space>
    </Container>
  )
}

export default PublicBoards
