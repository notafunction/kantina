import React from 'react'
import {
  ObservableStatus,
  useDatabase,
  useDatabaseListData
} from 'reactfire'
import {
  query,
  ref,
  orderByChild,
  equalTo,
  limitToLast
} from 'firebase/database'
import { Link } from 'react-router-dom'
import { Card, Spin } from 'antd'
import DashboardBoardItem from './DashboardBoardItem'
import Styled from './Styled'
import { Board } from '@/types'

const PublicBoards = () => {
  const db = useDatabase()
  const publicBoards: ObservableStatus<Board[]> =
    useDatabaseListData(
      query(
        ref(db, `boards`),
        orderByChild('public'),
        equalTo(true),
        limitToLast(10)
      ),
      {
        idField: 'id'
      }
    )

  return (
    <Spin
      spinning={publicBoards.status === 'loading'}
      wrapperClassName="flex-1"
    >
      <Card
        title="Public Boards"
        bordered={false}
        className="min-h-[200px]"
      >
        <Styled.Grid>
          {publicBoards.data &&
            publicBoards.data.map((board) => (
              <Link to={`/b/${board.id}`} key={board.id}>
                <DashboardBoardItem board={board} />
              </Link>
            ))}
        </Styled.Grid>
      </Card>
    </Spin>
  )
}

export default PublicBoards
