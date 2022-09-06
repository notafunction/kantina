import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'
import { Navigate } from 'react-router-dom'
import { useDatabase, useDatabaseObjectData, useSigninCheck } from 'reactfire'
import { ref } from 'firebase/database'
import { Spin } from 'antd'

const RequireAccess = (props) => {
  const params = useParams()
  const db = useDatabase()
  const auth = useSigninCheck()
  const board = useDatabaseObjectData(ref(db, `boards/${params.boardId}`), {
    idField: 'id'
  })

  if (auth.status === 'loading' || board.status === 'loading') {
    return <Spin />
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
  children: PropTypes.object.isRequired
}

export default RequireAccess
