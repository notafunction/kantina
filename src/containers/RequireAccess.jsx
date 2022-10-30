import React from 'react'
import PropTypes from 'prop-types'
import { useParams, useNavigate } from 'react-router'
import { Navigate } from 'react-router-dom'
import { useDatabase, useDatabaseObjectData, useSigninCheck } from 'reactfire'
import { ref } from 'firebase/database'
import { Spin, Result, Button } from 'antd'

const RequireAccess = (props) => {
  const navigate = useNavigate()
  const params = useParams()
  const db = useDatabase()
  const auth = useSigninCheck()
  const board = useDatabaseObjectData(ref(db, `boards/${params.boardId}`), {
    idField: 'id'
  })

  if (auth.status === 'loading' || board.status === 'loading') {
    return (
      <div className="m-auto">
        <Spin size="large" />
      </div>
    )
  }

  if (board.data === null) {
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

  const canViewBoard = () => {
    if (board.data.public) {
      return true
    }

    if (auth.data === null) {
      return false
    }

    if (
      auth.data.signedIn &&
      board.data.members &&
      Object.keys(board.data.members).includes(auth.data.user.uid)
    ) {
      return true
    }
  }

  return canViewBoard() ? props.children : <Navigate to="/" replace />
}

RequireAccess.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired
}

export default RequireAccess
