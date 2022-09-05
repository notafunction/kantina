import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useDatabase, useDatabaseListData } from 'reactfire'
import { Card, Spin } from 'antd'
import DashboardBoardItem from '../../components/Dashboard/DashboardBoardItem'
import { Link } from 'react-router-dom'
import { ref } from 'firebase/database'

const Styled = {
  Grid: styled.div`
    ${tw`grid gap-4 grid-cols-4`}
  `
}

function Dashboard() {
  const db = useDatabase()

  const boards = useDatabaseListData(ref(db, `boards`), {
    idField: 'id'
  })

  if (boards.status === 'loading') {
    return <Spin />
  }

  return (
    <div className="flex flex-col gap-4">
      <Card title="Recent Boards" bordered={false}>
        <Styled.Grid>
          {boards.data &&
            boards.data.map((board) => (
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
