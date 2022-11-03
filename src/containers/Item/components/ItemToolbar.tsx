import React, { useState } from 'react'
import { Button, Tooltip } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { useSigninCheck } from 'reactfire'
import Styled from './Styled'
import ItemSettingsModal from './ItemSettingsModal'
import { Item } from '@/types'

type Props = {
  item: Item
}

const ItemToolbar: React.FunctionComponent<Props> = () => {
  const auth = useSigninCheck()

  const [isItemSettingsModalVisible, setIsItemSettingsModalVisible] = useState(false)

  if (auth.status === 'loading' || !auth.data.signedIn) {
    return null
  }

  return (
    <Styled.Toolbar>
      <Tooltip title="Manage Item">
        <Button
          size="small"
          type="text"
          onClick={() => setIsItemSettingsModalVisible(true)}
          icon={<SettingOutlined />}></Button>
      </Tooltip>

      <ItemSettingsModal
        visible={isItemSettingsModalVisible}
        close={() => setIsItemSettingsModalVisible(false)}
      />
    </Styled.Toolbar>
  )
}

ItemToolbar.propTypes = {}

export default ItemToolbar
