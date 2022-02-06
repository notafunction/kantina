/* eslint-disable no-unused-vars */
import { Space } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { isLoaded, isEmpty, useFirebaseConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import BoardTile from '../components/Board/BoardTile'
import Container from '../components/Container'
import StyledSpin from '../components/Spin'

const StyledLink = styled(Link)`
  display: block;
  margin: 0 0.5rem;
`

const Boards = () => {
  useFirebaseConnect({
    path: `boards`,
    storeAs: 'allBoards',
    queryParams: ['orderByChild=type', 'equalTo=public']
  })

  const allBoards = useSelector(
    ({
      firebase: {
        ordered: { allBoards }
      }
    }) => allBoards
  )

  if (!isLoaded(allBoards)) return <StyledSpin />
  if (isEmpty(allBoards)) return null

  return (
    <Container flex>
      <Space align="start" wrap>
        {allBoards.map((board) => (
          <StyledLink to={`/b/${board.key}`} key={board.key}>
            <BoardTile board={{ id: board.key, ...board.value }} />
          </StyledLink>
        ))}
      </Space>
    </Container>
  )
}

export default Boards
