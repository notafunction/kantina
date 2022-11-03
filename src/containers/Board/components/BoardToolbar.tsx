import React, { useState } from 'react'
import { Spin, Tooltip, Button } from 'antd'
import { PlusOutlined, SettingOutlined } from '@ant-design/icons'
import CreateListModal from './CreateListModal'
import BoardSettingsModal from './BoardSettingsModal'
import { useSigninCheck } from 'reactfire'
import Restricted from '@/containers/Permission/Restricted'

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
      <Restricted to="list:create">
        <Tooltip title="Add List">
          <Button
            onClick={() => setIsCreateListModalVisible(true)}
            icon={<PlusOutlined />}
            type="text"
          />
        </Tooltip>

        <CreateListModal
          visible={isCreateListModalVisible}
          close={() => setIsCreateListModalVisible(false)}
        />
      </Restricted>

      <Restricted to="board:edit">
        <Tooltip title="Manage Board">
          <Button
            onClick={() => setIsBoardSettingsModalVisible(true)}
            icon={<SettingOutlined />}
            type="text"
          />
        </Tooltip>

        <BoardSettingsModal
          visible={isBoardSettingsModalVisible}
          close={() => setIsBoardSettingsModalVisible(false)}
        />
      </Restricted>
    </React.Fragment>
  )
}

export default BoardToolbar
