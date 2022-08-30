import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'
import { Navigate } from 'react-router-dom'
import { useDatabase, useDatabaseObjectData, useSigninCheck } from 'reactfire'
import { query, ref } from 'firebase/database'
import { Spin } from 'antd'

const RequireAccess = (props) => {
  const params = useParams()

  const db = useDatabase()
  const boardQuery = query(ref(db, `boards/${params.boardId}`))
  const { status: boardStatus, data: board } = useDatabaseObjectData(boardQuery, {
    idField: 'id'
  })
  const { status: signinCheckStatus, data: signinCheckData } = useSigninCheck()

  if (boardStatus === 'loading' || signinCheckStatus === 'loading') return <Spin />

  const canViewBoard = () => {
    if (board.type === 'public') {
      return true
    }

    if (signinCheckData.signedIn && board.createdBy === signinCheckData.user.uid) {
      return true
    }
  }

  return canViewBoard() ? props.children : <Navigate to="/" replace />
}

RequireAccess.propTypes = {
  children: PropTypes.object.isRequired
}

export default RequireAccess
