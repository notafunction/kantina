import React from 'react'
import PropTypes from 'prop-types'
import { Card, Statistic } from 'antd'
import Spin from '../Spin'
import { useDatabase, useDatabaseListData } from 'reactfire'
import { query, ref } from 'firebase/database'

function BoardTile(props) {
  const db = useDatabase()
  const listsQuery = query(ref(db, `lists/${props.board.id}`))
  const { status, data: lists } = useDatabaseListData(listsQuery, {
    idField: 'id'
  })
  // useFirebaseConnect(`lists/${props.board.id}`)
  // const lists = useSelector(
  //   ({
  //     firebase: {
  //       ordered: { lists }
  //     }
  //   }) => lists && lists[props.board.id]
  // )

  return (
    <Spin spinning={status === 'loading'}>
      <Card title={props.board.title}>
        <Statistic title="Lists" value={lists ? lists.length : 0} />
      </Card>
    </Spin>
  )
}

BoardTile.propTypes = {
  board: PropTypes.object.isRequired
}

export default BoardTile
