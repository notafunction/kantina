import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from 'antd'

const UserAvatar = (props) => {
  console.log(props.user.photoURL)
  return <Avatar src={props.user.photoURL} alt={props.user.displayName} />
}

UserAvatar.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserAvatar
