import React, { useState } from 'react'
import { Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { useSigninCheck } from 'reactfire'
import Styled from './Styled'
import ItemSettingsDrawer from './ItemSettingsDrawer'

const ItemToolbar = (props) => {
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

      <ItemSettingsDrawer
        item={props.item}
        list={props.list}
        visible={isSettingsOpen}
        close={() => setIsSettingsOpen(false)}
      />
    </Styled.Toolbar>
  )
}

ItemToolbar.propTypes = {
  item: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired
}

export default ItemToolbar
