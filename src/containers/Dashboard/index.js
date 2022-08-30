import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { query, ref } from 'firebase/database'
import { useDatabase, useDatabaseListData } from 'reactfire'
import { Card, Spin } from 'antd'
import DashboardBoardItem from '../../components/Dashboard/DashboardBoardItem'
import { Link } from 'react-router-dom'

const Styled = {
  Grid: styled.div`
    ${tw`grid gap-4 grid-cols-4`}
  `
}

function Dashboard() {
  const db = useDatabase()
  const recentBoardsQuery = query(ref(db, 'boards'))
  const { status, data: recentBoards } = useDatabaseListData(recentBoardsQuery, {
    idField: 'id'
  })

  if (status === 'loading') return <Spin />

  return (
    <div className="flex flex-col gap-4">
      <Card title="Recent Boards" bordered={false}>
        <Styled.Grid>
          {recentBoards &&
            recentBoards.map((board) => (
              <Link to={`/b/${board.id}`} key={board.id}>
                <DashboardBoardItem board={board} />
              </Link>
            ))}
        </Styled.Grid>
      </Card>
    </div>
  )
}

export default Dashboard
