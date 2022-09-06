import React, { useState } from 'react'
import { Button, Tooltip } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { useSigninCheck } from 'reactfire'
import Styled from './Styled'
import ItemSettingsDrawer from './ItemSettingsDrawer'

const ItemToolbar = () => {
  const auth = useSigninCheck()

  const [isItemSettingsDrawerVisible, setIsItemSettingsDrawerVisible] = useState(false)

  if (auth.status === 'loading' || !auth.data.signedIn) {
    return null
  }

  return (
    <Styled.Toolbar>
      <Tooltip title="Manage Item">
        <Button
          size="small"
          type="text"
          onClick={() => setIsItemSettingsDrawerVisible(true)}
          icon={<SettingOutlined />}></Button>
      </Tooltip>

      <ItemSettingsDrawer
        visible={isItemSettingsDrawerVisible}
        close={() => setIsItemSettingsDrawerVisible(false)}
      />
    </Styled.Toolbar>
  )
}

ItemToolbar.propTypes = {}

export default ItemToolbar
