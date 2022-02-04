import React from 'react'
import PropTypes from 'prop-types'
import { Navigate, useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import Spin from './Spin'

const RequireAccess = (props) => {
  const { boardId } = useParams()
  useFirebaseConnect([`boards/${boardId}`])
  const auth = useSelector(({ firebase: { auth } }) => auth)
  const board = useSelector(({ firebase: { data } }) => data.boards && data.boards[boardId])

  if (!isLoaded(board)) return <Spin />

  const checkAccess = () => {
    if (board.type === 'public') return true

    if (!isEmpty(auth) && board.createdBy === auth.uid) {
      return true
    }

    return false
  }

  return checkAccess() ? props.children : <Navigate to="/" replace />
}

RequireAccess.propTypes = {
  children: PropTypes.object.isRequired
}

export default RequireAccess
