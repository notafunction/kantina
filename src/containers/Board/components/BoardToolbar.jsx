import React, { useState } from 'react'
import { Menu, Spin, Tooltip, Button } from 'antd'
import { PlusOutlined, SettingOutlined } from '@ant-design/icons'
import CreateListModal from './CreateListModal'
import BoardSettingsDrawer from './BoardSettingsDrawer'
import { useSigninCheck } from 'reactfire'

const BoardToolbar = () => {
  const auth = useSigninCheck()
  const [isCreateListModalVisible, setIsCreateListModalVisible] = useState(false)
  const [isBoardSettingsDrawerVisible, setIsBoardSettingsDrawerVisible] = useState(false)

  if (auth.status === 'loading') {
    return <Spin />
  }

  if (!auth.data || !auth.data.signedIn) {
    return null
  }

  const handleMenuClick = (event) => {
    switch (event.key) {
      case 'list:create': {
        setIsCreateListModalVisible(true)
        break
      }
      case 'board:settings': {
        setIsBoardSettingsDrawerVisible(true)
      }
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="list:create" icon={<PlusOutlined />}>
        Create List
      </Menu.Item>
      <Menu.Item key="board:settings" icon={<SettingOutlined />}>
        Board Settings
      </Menu.Item>
    </Menu>
  )

  return (
    <React.Fragment>
      <Tooltip title="Add List">
        <Button
          onClick={() => setIsCreateListModalVisible(true)}
          icon={<PlusOutlined />}
          type="text"
        />
      </Tooltip>

      <Tooltip title="Manage Board">
        <Button
          onClick={() => setIsBoardSettingsDrawerVisible(true)}
          icon={<SettingOutlined />}
          type="text"
        />
      </Tooltip>

      <CreateListModal
        visible={isCreateListModalVisible}
        close={() => setIsCreateListModalVisible(false)}
      />
      <BoardSettingsDrawer
        visible={isBoardSettingsDrawerVisible}
        close={() => setIsBoardSettingsDrawerVisible(false)}
      />
    </React.Fragment>
  )
}

BoardToolbar.propTypes = {}

export default BoardToolbar
