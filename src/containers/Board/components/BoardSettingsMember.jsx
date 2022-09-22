import React, { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Dropdown, Menu, Tag } from 'antd'
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons'
import { BoardContext } from './BoardContext'

const BoardSettingsMember = (props) => {
  const board = useContext(BoardContext)

  const memberRole = useMemo(() => {
    return props.member.boards[board.id].role
  }, [props.member])

  const renderMemberTags = () => {
    switch (memberRole) {
      case 'admin':
        return <Tag color="red">Admin</Tag>

      default:
        return null
    }
  }

  const menu = (
    <Menu>
      <Menu.Item danger icon={<DeleteOutlined />} key="remove">
        Remove
      </Menu.Item>
    </Menu>
  )

  return (
    <div key={props.member.uid} className="flex items-start gap-2">
      <div className="flex items-center gap-2">
        <Avatar src={props.member.photoURL ?? null}>
          {!props.member.photoURL
            ? props.member.displayName
                .split(' ')
                .map((word) => word.charAt(0))
                .join('')
            : null}
        </Avatar>

        <div className="flex flex-col items-start text-sm">
          <div className="flex gap-2">
            {props.member.displayName}
            {renderMemberTags()}
          </div>
          <span>{props.member.email}</span>
        </div>
      </div>

      {/* <Dropdown.Button overlay={menu} className="ml-auto" type="text" icon={<SettingOutlined />} /> */}
    </div>
  )
}

BoardSettingsMember.propTypes = {
  member: PropTypes.object.isRequired
}

export default BoardSettingsMember
