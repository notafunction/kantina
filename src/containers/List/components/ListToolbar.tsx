import React, { useState } from 'react'
import { Button, Tooltip } from 'antd'
import {
  SettingOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { useSigninCheck } from 'reactfire'
import ListSettingsModal from './ListSettingsModal'
import CreateItemModal from './CreateItemModal'
import Restricted from '@/containers/Permission/Restricted'

type Props = {
  showItemCreate?: boolean
}

const ListToolbar: React.FunctionComponent<Props> = (
  props
) => {
  const auth = useSigninCheck()
  const [
    isListSettingsModalVisible,
    setIsListSettingsModalVisible
  ] = useState(false)
  const [
    isCreateItemModalVisible,
    setIsCreateItemModalVisible
  ] = useState(false)

  if (auth.status === 'loading') {
    return null
  }

  if (auth.data.signedIn === false) {
    return null
  }

  return (
    <div className="flex items-center gap-1">
      {props.showItemCreate && (
        <Restricted to="item:create">
          <Tooltip title="Add Item">
            <Button
              size="small"
              type="text"
              icon={<PlusOutlined />}
              onClick={() =>
                setIsCreateItemModalVisible(true)
              }
            />
          </Tooltip>

          <CreateItemModal
            visible={isCreateItemModalVisible}
            close={() => setIsCreateItemModalVisible(false)}
          />
        </Restricted>
      )}

      <Restricted to="list:edit">
        <Tooltip title="Manage List">
          <Button
            size="small"
            type="text"
            onClick={() =>
              setIsListSettingsModalVisible(true)
            }
            icon={<SettingOutlined />}
          ></Button>
        </Tooltip>

        <ListSettingsModal
          visible={isListSettingsModalVisible}
          close={() => setIsListSettingsModalVisible(false)}
        />
      </Restricted>
    </div>
  )
}

export default ListToolbar
