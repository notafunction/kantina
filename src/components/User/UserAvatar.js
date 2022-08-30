import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from 'antd'

const UserAvatar = ({ user, ...props }) => {
  const imageUrl = user.avatarUrl || `https://joeschmoe.io/api/v1/${user.email || 'random'}`

  return (
    <div>
      <Avatar {...props} src={imageUrl} alt={user.displayName} />
    </div>
  )
}

UserAvatar.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserAvatar
