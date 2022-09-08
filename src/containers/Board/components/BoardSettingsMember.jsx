import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Dropdown, Menu } from 'antd'
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons'
const BoardSettingsMember = (props) => {
  const menu = (
    <Menu>
      <Menu.Item danger icon={<DeleteOutlined />}>
        Remove
      </Menu.Item>
    </Menu>
  )

  return (
    <div key={props.user.uid} className="flex items-start gap-2">
      <div className="flex items-center gap-2">
        <Avatar src={props.user.photoURL ?? null}>
          {!props.user.photoURL
            ? props.user.displayName
                .split(' ')
                .map((word) => word.charAt(0))
                .join('')
            : null}
        </Avatar>

        <div className="flex flex-col items-start text-sm">
          <span>
            {props.user.displayName}
            {props.user.role && props.user.role === 'admin' ? <Tag color="red">admin</Tag> : null}
          </span>
          <span>{props.user.email}</span>
        </div>
      </div>

      <Dropdown.Button overlay={menu} className="ml-auto" type="text" icon={<SettingOutlined />} />
    </div>
  )
}

BoardSettingsMember.propTypes = {
  user: PropTypes.object.isRequired
}

export default BoardSettingsMember
