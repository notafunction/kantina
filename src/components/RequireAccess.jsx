import React from 'react'
import PropTypes from 'prop-types'
import { Navigate, useParams } from 'react-router'
import { useDatabase, useDatabaseObjectData, useSigninCheck } from 'reactfire'
import { query, ref } from 'firebase/database'
import { Spin } from 'antd'

const RequireAccess = (props) => {
  const { boardId } = useParams()
  const db = useDatabase()

  const boardQuery = query(ref(db, `boards/${boardId}`))
  const { status, data: board } = useDatabaseObjectData(boardQuery, {
    idField: 'id'
  })
  const { status: signinCheckStatus, data: signinCheckData } = useSigninCheck()

  if (status === 'loading' || signinCheckStatus === 'loading') {
    return <Spin />
  }

  console.log(board)

  const checkAccess = (board) => {
    if (board.type === 'public') return true

    if (signinCheckData.signedIn && board.createdBy === signinCheckData.user.uid) {
      return true
    }

    return false
  }

  return checkAccess(board) ? props.children : <Navigate to="/" replace />
}

RequireAccess.propTypes = {
  children: PropTypes.object.isRequired
}

export default RequireAccess
