import React, { useState } from 'react'
import { Button, Tooltip } from 'antd'
import { SettingOutlined, PlusOutlined } from '@ant-design/icons'
import { useSigninCheck } from 'reactfire'
import ListSettingsDrawer from './ListSettingsDrawer'
import CreateItemModal from './CreateItemModal'

const ListToolbar = () => {
  const auth = useSigninCheck()
  const [isListSettingsDrawerVisible, setIsListSettingsDrawerVisible] = useState(false)
  const [isCreateItemModalVisible, setIsCreateItemModalVisible] = useState(false)

  if (auth.status === 'loading') {
    return null
  }

  if (auth.data.signedIn === false) {
    return null
  }

  return (
    <>
      <Tooltip title="Add Item">
        <Button
          size="small"
          type="text"
          icon={<PlusOutlined />}
          onClick={() => setIsCreateItemModalVisible(true)}
        />
      </Tooltip>

      <Tooltip title="Manage List">
        <Button
          size="small"
          type="text"
          onClick={() => setIsListSettingsDrawerVisible(true)}
          icon={<SettingOutlined />}></Button>
      </Tooltip>

      <ListSettingsDrawer
        visible={isListSettingsDrawerVisible}
        close={() => setIsListSettingsDrawerVisible(false)}
      />

      <CreateItemModal
        visible={isCreateItemModalVisible}
        close={() => setIsCreateItemModalVisible(false)}
      />
    </>
  )
}

ListToolbar.propTypes = {}

export default ListToolbar
