import React from 'react'
import PropTypes from 'prop-types'
import { useSigninCheck } from 'reactfire'
import { Spin } from 'antd'
import BoardToolbar from './BoardToolbar'

function UserToolbar(props) {
  const { status, data: signinCheckResult } = useSigninCheck()

  if (status === 'loading') {
    return <Spin />
  }

  if (signinCheckResult.signedIn === true) {
    return <BoardToolbar handleClick={props.onClick} />
  }

  return null
}

UserToolbar.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default UserToolbar
