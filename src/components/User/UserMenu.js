import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Dropdown, Menu, Spin } from 'antd'
import { LogoutOutlined, GroupOutlined, SettingOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'
import { CreateBoardModal } from '../Board'
import UserSettingsDrawer from './UserSettingsDrawer'
import { useAuth, useDatabase, useDatabaseObject } from 'reactfire'
import { ref } from 'firebase/database'

function UserMenu(props) {
  const navigate = useNavigate()
  const auth = useAuth()
  const db = useDatabase()
  const { status, data: userBoards } = useDatabaseObject(ref(db, `users/${props.user.uid}/boards`))

  const [createBoardModalVisible, setCreateBoardModalVisible] = React.useState(false)
  const [userSettingsDrawerVisible, setUserSettingsDrawerVisible] = React.useState(false)

  const handleMenuClick = (event) => {
    switch (event.key) {
      case '$logout': {
        auth.signOut()
        break
      }
      case '$create': {
        setCreateBoardModalVisible(true)
        break
      }
      case '$settings': {
        setUserSettingsDrawerVisible(true)
        break
      }
      default: {
        navigate(`/b/${event.key}`)
      }
    }
  }

  if (status === 'loading') {
    return <Spin />
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.SubMenu key="userBoards" title="My Boards" icon={<GroupOutlined />}>
        {userBoards &&
          userBoards.map((board) => <Menu.Item key={board.id}>{board.title}</Menu.Item>)}
        {userBoards && userBoards.length && <Menu.Divider />}
        <Menu.Item key="$create">Create Board</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="$settings" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="$logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <Dropdown overlay={menu} trigger={['click']}>
        <Avatar
          shape="square"
          size="large"
          key="user-menu-avatar"
          src={props.user.photoURL}
          style={{ cursor: 'pointer' }}
        />
      </Dropdown>

      <CreateBoardModal
        close={() => setCreateBoardModalVisible(false)}
        visible={createBoardModalVisible}
      />

      <UserSettingsDrawer
        user={props.user}
        visible={userSettingsDrawerVisible}
        close={() => setUserSettingsDrawerVisible(false)}
      />
    </>
  )
}

UserMenu.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserMenu
