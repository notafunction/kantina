import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button as AntButton, Dropdown, Menu, Space } from 'antd'
import {
  LogoutOutlined,
  PlusOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { Button, Intent } from '@blueprintjs/core'
import { useAuth } from 'reactfire'
import UserSettingsModal from '../../containers/User/UserSettingsModal'
import CreateBoardModal from '../../containers/Board/components/CreateBoardModal'
function UserMenu(props) {
  const auth = useAuth()

  const [userSettingsModalVisible, setUserSettingsModalVisible] =
    useState(false)
  const [boardCreateModalVisible, setBoardCreateModalVisible] = useState(false)

  const handleMenuClick = (event) => {
    switch (event.key) {
      case '$logout': {
        auth.signOut()
        break
      }
      case '$settings': {
        setUserSettingsModalVisible(true)
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
    <Space>
      <Button
        onClick={() => setBoardCreateModalVisible(true)}
        intent={Intent.PRIMARY}
        icon="small-plus">
        Create Board
      </Button>

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
        visible={boardCreateModalVisible}
        close={() => setBoardCreateModalVisible(false)}
      />

      <UserSettingsModal
        user={props.user}
        visible={userSettingsModalVisible}
        close={() => setUserSettingsModalVisible(false)}
      />
    </Space>
  )
}

UserMenu.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserMenu
