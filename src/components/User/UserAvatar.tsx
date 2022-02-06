import React from 'react'
import { Avatar } from 'antd'
import { UserProfile } from '../../common/types'
import { AvatarProps } from 'antd/lib/avatar'

type Props = AvatarProps & {
  user: UserProfile
}

const UserAvatar = ({ user, ...props }: Props) => {
  const imageUrl = user.avatarUrl || `https://joeschmoe.io/api/v1/${user.email || 'random'}`

  return (
    <div>
      <Avatar {...props} src={imageUrl} alt={user.displayName} />
    </div>
  )
}

export default UserAvatar
