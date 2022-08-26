import React from 'react'
import { Space } from 'antd'
import { query, ref, orderByChild, equalTo } from 'firebase/database'
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

const Boards = () => {
  const database = useDatabase()
  const boardsQuery = query(ref(database, 'boards'), orderByChild('type'), equalTo('public'))
  const { status, data: boards } = useDatabaseListData(boardsQuery, {
    idField: 'id'
  })

  if (status === 'loading') {
    return <StyledSpin />
  }

  return (
    <Container flex>
      <Space align="start" wrap>
        {boards.map((board) => (
          <StyledLink to={`/b/${board.id}`} key={board.id}>
            <BoardTile board={board} />
          </StyledLink>
        ))}
      </Space>
    </Container>
  )
}

export default Boards
