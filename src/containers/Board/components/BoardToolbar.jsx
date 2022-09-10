import React, { useState } from 'react'
import { Spin, Tooltip, Button } from 'antd'
import { PlusOutlined, SettingOutlined } from '@ant-design/icons'
import CreateListModal from './CreateListModal'
import BoardSettingsModal from './BoardSettingsModal'
import { useSigninCheck } from 'reactfire'

const BoardToolbar = () => {
  const auth = useSigninCheck()
  const [isCreateListModalVisible, setIsCreateListModalVisible] = useState(false)
  const [isBoardSettingsModalVisible, setIsBoardSettingsModalVisible] = useState(false)

  if (auth.status === 'loading') {
    return <Spin />
  }

  if (!auth.data || !auth.data.signedIn) {
    return null
  }

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
          onClick={() => setIsBoardSettingsModalVisible(true)}
          icon={<SettingOutlined />}
          type="text"
        />
      </Tooltip>

      <CreateListModal
        visible={isCreateListModalVisible}
        close={() => setIsCreateListModalVisible(false)}
      />
      <BoardSettingsModal
        visible={isBoardSettingsModalVisible}
        close={() => setIsBoardSettingsModalVisible(false)}
      />
    </React.Fragment>
  )
}

BoardToolbar.propTypes = {}

export default BoardToolbar
