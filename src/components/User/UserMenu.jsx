import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Dropdown, Menu } from 'antd'
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons'
import { useAuth } from 'reactfire'
import UserSettingsDrawer from './UserSettingsDrawer'
function UserMenu(props) {
  const auth = useAuth()

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
