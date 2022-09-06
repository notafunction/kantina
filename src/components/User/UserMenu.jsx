import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Dropdown, Menu, Spin } from 'antd'
import { LogoutOutlined, GroupOutlined, SettingOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'
import CreateBoardModal from '../../containers/Board/components/CreateBoardModal'
import UserSettingsDrawer from './UserSettingsDrawer'
import { useDatabase, useAuth } from 'reactfire'
import { ref, get } from 'firebase/database'
function UserMenu(props) {
  const navigate = useNavigate()
  const auth = useAuth()
  const db = useDatabase()

  const [boards, setBoards] = useState([])
  const [createBoardModalVisible, setCreateBoardModalVisible] = React.useState(false)
  const [userSettingsDrawerVisible, setUserSettingsDrawerVisible] = React.useState(false)

  const handleMenuClick = (event) => {
    switch (event.key) {
      case '$logout': {
        auth.signOut()
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

  const menu = (
    <Menu onClick={handleMenuClick}>
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
