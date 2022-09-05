import React, { useState } from 'react'
import { Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useSigninCheck } from 'reactfire'
import Styled from './Styled'
import ItemSettingsDrawer from './ItemSettingsDrawer'

const ItemToolbar = () => {
  const auth = useSigninCheck()

  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  if (auth.status === 'loading' || !auth.data.signedIn) {
    return null
  }

  return (
    <Styled.Toolbar>
      <Button
        size="small"
        type="text"
        onClick={() => setIsSettingsOpen(true)}
        icon={<EditOutlined />}></Button>

      <ItemSettingsDrawer visible={isSettingsOpen} close={() => setIsSettingsOpen(false)} />
    </Styled.Toolbar>
  )
}

ItemToolbar.propTypes = {}

export default ItemToolbar
