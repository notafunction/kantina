import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Dropdown, Menu, Spin } from 'antd'
import { LogoutOutlined, GroupOutlined, SettingOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'
import { CreateBoardModal } from '../Board'
import UserSettingsDrawer from './UserSettingsDrawer'
import { useUser, useDatabase, useDatabaseObjectData, useAuth } from 'reactfire'
import { ref, get } from 'firebase/database'
function UserMenu(props) {
  const navigate = useNavigate()
  const user = useUser()
  const auth = useAuth()
  const db = useDatabase()

  const userBoards = useDatabaseObjectData(ref(db, `users/${user.data.uid}/boards`), {
    idField: false
  })

  const [boards, setBoards] = useState([])
  const [createBoardModalVisible, setCreateBoardModalVisible] = React.useState(false)
  const [userSettingsDrawerVisible, setUserSettingsDrawerVisible] = React.useState(false)

  useEffect(() => {
    if (userBoards.status === 'loading') return

    const fetchData = async () => {
      const boardIds = Object.keys(userBoards.data)

      const boards = await Promise.all(
        boardIds.map(async (id) => {
          const snap = await get(ref(db, `boards/${id}`))

          if (snap.exists()) {
            return {
              id,
              ...snap.val()
            }
          }
        })
      )

      setBoards(boards)
    }

    fetchData().catch(console.error)
  }, [userBoards])

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

  if (userBoards.status === 'loading') {
    return <Spin />
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.SubMenu key="userBoards" title="My Boards" icon={<GroupOutlined />}>
        {boards.map((board) => (
          <Menu.Item key={board.id}>{board.title}</Menu.Item>
        ))}
        {boards.length ? <Menu.Divider /> : null}
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
