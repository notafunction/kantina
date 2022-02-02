import React from 'react'
import { Dropdown, Menu } from 'antd'
import { useSelector } from 'react-redux'
import { useFirebase, useFirebaseConnect } from 'react-redux-firebase'
import { LogoutOutlined, GroupOutlined, SettingOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'
import { CreateBoardModal } from '../Board'
import UserAvatar from './UserAvatar'
import UserSettingsDrawer from './UserSettingsDrawer'

const UserMenu = () => {
  const [createBoardModalVisible, setCreateBoardModalVisible] = React.useState(false)
  const [userSettingsDrawerVisible, setUserSettingsDrawerVisible] = React.useState(false)
  const navigate = useNavigate()
  const firebase = useFirebase()
  const auth = useSelector(({ firebase: { auth } }) => auth)
  const profile = useSelector(({ firebase: { profile } }) => profile)

  useFirebaseConnect({
    path: 'boards',
    queryParams: ['orderByChild=createdBy', `equalTo=${auth.uid}`],
    storeAs: 'userBoards'
  })
  const userBoards = useSelector(
    ({
      firebase: {
        ordered: { userBoards }
      }
    }) => userBoards
  )

  const handleMenuClick = (event) => {
    switch (event.key) {
      case '$logout': {
        firebase.auth().signOut()
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

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.SubMenu key="userBoards" title="My Boards" icon={<GroupOutlined />}>
        {userBoards &&
          userBoards.map((board) => <Menu.Item key={board.key}>{board.value.title}</Menu.Item>)}
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
        <UserAvatar
          shape="square"
          size="large"
          key="user-menu-avatar"
          user={profile}
          style={{ cursor: 'pointer' }}
        />
      </Dropdown>

      <CreateBoardModal
        close={() => setCreateBoardModalVisible(false)}
        visible={createBoardModalVisible}
      />

      <UserSettingsDrawer
        visible={userSettingsDrawerVisible}
        close={() => setUserSettingsDrawerVisible(false)}
      />
    </>
  )
}

export default UserMenu
