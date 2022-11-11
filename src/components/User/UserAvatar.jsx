import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from 'antd'

const UserAvatar = (props) => {
  return (
    <Avatar
      src={props.user.photoURL}
      alt={props.user.displayName}
    />
  )
}

UserAvatar.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserAvatar
