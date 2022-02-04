import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'
import { Navigate } from 'react-router-dom'
import { isEmpty, useFirebaseConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux'

const RequireAccess = (props) => {
  const params = useParams()
  useFirebaseConnect([{ path: `boards/${params.boardId}` }])
  const board = useSelector(({ firebase: { data } }) => data.boards && data.boards[params.boardId])
  const auth = useSelector(({ firebase: { auth } }) => auth)

  const canViewBoard = () => {
    console.log(auth)
    if (board.type === 'public') {
      return true
    }

    if (!isEmpty(auth) && board.createdBy === auth.uid) {
      return true
    }
  }

  return canViewBoard() ? props.children : <Navigate to="/" replace />
}

RequireAccess.propTypes = {
  children: PropTypes.object.isRequired
}

export default RequireAccess
