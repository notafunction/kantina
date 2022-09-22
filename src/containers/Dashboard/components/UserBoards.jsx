import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDatabase, useDatabaseObjectData } from 'reactfire'
import { Spin, Card, Empty, Button } from 'antd'
import { Link } from 'react-router-dom'
import { get, ref } from 'firebase/database'
import DashboardBoardItem from './DashboardBoardItem'
import Styled from './Styled'
import CreateBoardModal from '../../Board/components/CreateBoardModal'

const UserBoards = (props) => {
  const db = useDatabase()
  const userBoardIds = useDatabaseObjectData(ref(db, `users/${props.user.uid}/boards`), {
    idField: false
  })

  const [boards, setBoards] = useState([])
  const [isCreateBoardModalVisible, setIsCreateBoardModalVisible] = useState(false)

  useEffect(() => {
    if (userBoardIds.status === 'success') {
      if (userBoardIds.data === null) {
        return setBoards([])
      }

      const fetchData = async () => {
        const boards = await Promise.all(
          Object.keys(userBoardIds.data).map(async (id) => {
            const snap = await get(ref(db, `boards/${id}`))

            if (snap.exists()) {
              return {
                id,
                ...snap.val()
              }
            }
          })
        )

        setBoards(boards.filter((board) => !!board))
      }

      fetchData().catch(console.error)
    }
  }, [userBoardIds.data])

  const renderBoard = (board) => (
    <Link to={`/b/${board.id}`} key={board.id}>
      <DashboardBoardItem board={board} />
    </Link>
  )

  return (
    <Spin spinning={userBoardIds.status === 'loading'} wrapperClassName="flex-1">
      <Card title="My Boards" bordered={false} className="min-h-[200px]">
        {boards.length ? (
          <Styled.Grid>{boards.map((board) => renderBoard(board))}</Styled.Grid>
        ) : (
          userBoardIds.status !== 'loading' && (
            <Empty>
              <Button type="primary" onClick={() => setIsCreateBoardModalVisible(true)}>
                Create Board
              </Button>

              <CreateBoardModal
                visible={isCreateBoardModalVisible}
                close={() => setIsCreateBoardModalVisible(false)}
              />
            </Empty>
          )
        )}
      </Card>
    </Spin>
  )
}

UserBoards.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserBoards
