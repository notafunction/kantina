import React from 'react'
import PropTypes from 'prop-types'
import { Card, Statistic } from 'antd'
import { useSelector } from 'react-redux'
import { isLoaded, useFirebaseConnect } from 'react-redux-firebase'
import Spin from '../Spin'

const BoardTile = (props) => {
  useFirebaseConnect(`lists/${props.board.id}`)
  const lists = useSelector(
    ({
      firebase: {
        ordered: { lists }
      }
    }) => lists && lists[props.board.id]
  )

  return (
    <Spin spinning={!isLoaded(lists)}>
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
