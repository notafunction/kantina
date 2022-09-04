import React, { useState } from 'react'
import { Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import ListSettingsDrawer from './ListSettingsDrawer'
import CreateItemModal from './CreateItemModal'
import { useSigninCheck } from 'reactfire'

const ListToolbar = () => {
  const auth = useSigninCheck()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [createItemVisible, setCreateItemVisible] = useState(false)

  if (auth.status === 'loading') {
    return null
  }

  if (auth.data.signedIn === false) {
    return null
  }

  return (
    <div>
      <Button
        size="small"
        type="text"
        onClick={() => setIsSettingsOpen(true)}
        icon={<EditOutlined />}></Button>
      <ListSettingsDrawer visible={isSettingsOpen} close={() => setIsSettingsOpen(false)} />

      <CreateItemModal visible={createItemVisible} close={() => setCreateItemVisible(false)} />
    </div>
  )
}

ListToolbar.propTypes = {}

export default ListToolbar
