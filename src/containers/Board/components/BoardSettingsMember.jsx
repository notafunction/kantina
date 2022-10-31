import React, { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Dropdown, Menu, Tag } from 'antd'
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons'
import { BoardContext } from './BoardContext'
import Restricted from '@/containers/Permission/Restricted'
import { ref, set } from 'firebase/database'
import { useDatabase } from 'reactfire'

const BoardSettingsMember = (props) => {
  const db = useDatabase()
  const board = useContext(BoardContext)

  const setMemberRole = (role) => {
    set(ref(db, `boards/${board.id}/members/${props.member.uid}/role`), role)
    set(ref(db, `users/${props.member.uid}/boards/${board.id}/role`), role)
  }

  const memberRole = useMemo(() => {
    return props.member.boards[board.id].role
  }, [props.member])

  const renderMemberTags = () => {
    switch (memberRole) {
      case 'admin':
        return <Tag color="red">Admin</Tag>

      case 'editor':
        return <Tag color="yellow">Editor</Tag>

      case 'viewer':
        return <Tag color="blue">Viewer</Tag>

      default:
        return null
    }
  }

  const menu = (
    <Menu>
      <Menu.SubMenu title="Set Role" key="role">
        {['Viewer', 'Editor', 'Admin']
          .filter((role) => role.toLowerCase() !== memberRole)
          .map((role) => (
            <Menu.Item key={`role:${role}`} onClick={() => setMemberRole(role.toLowerCase())}>
              {role}
            </Menu.Item>
          ))}
      </Menu.SubMenu>

      <Restricted to="members:delete">
        <Menu.Item danger icon={<DeleteOutlined />} key="remove">
          Remove
        </Menu.Item>
      </Restricted>
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

      <Restricted to="members:edit">
        <Dropdown.Button
          overlay={menu}
          className="ml-auto"
          type="text"
          icon={<SettingOutlined />}
        />
      </Restricted>
    </div>
  )
}

BoardSettingsMember.propTypes = {
  member: PropTypes.object.isRequired
}

export default BoardSettingsMember
