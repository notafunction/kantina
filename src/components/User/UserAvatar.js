import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from 'antd'

const UserAvatar = ({ user, ...props }) => {
  const imageUrl = user.avatarUrl || `https://joeschmoe.io/api/v1/${user.email || 'random'}`

  return <Avatar {...props} src={imageUrl} />
}

UserAvatar.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserAvatar
