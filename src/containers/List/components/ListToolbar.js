import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Menu, Popconfirm } from 'antd'
import { PlusOutlined, SettingOutlined, DeleteOutlined, WarningOutlined } from '@ant-design/icons'
import ListSettingsDrawer from './ListSettingsDrawer'
import CreateItemModal from './CreateItemModal'

const ListToolbar = (props) => {
  const [settingsVisible, setSettingsVisible] = useState(false)
  const [createItemVisible, setCreateItemVisible] = useState(false)

  const handleMenuClick = (event) => {
    switch (event.key) {
      case 'list:settings': {
        setSettingsVisible(true)
        break
      }

      case 'item:create': {
        setCreateItemVisible(true)
        break
      }

      case 'list:delete': {
        break
      }
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="item:create" icon={<PlusOutlined />}>
        Create Item
      </Menu.Item>
      <Menu.Item key="list:settings" icon={<SettingOutlined />}>
        List Settings
      </Menu.Item>
      <Popconfirm
        okText="Yes"
        title="Are you sure?"
        okButtonProps={{ danger: true }}
        icon={<WarningOutlined />}>
        <Menu.Item danger key="list:delete" icon={<DeleteOutlined />}>
          Delete List
        </Menu.Item>
      </Popconfirm>
    </Menu>
  )

  return (
    <div>
      <Dropdown.Button trigger="click" size="small" type="text" overlay={menu} />

      <ListSettingsDrawer
        list={props.list}
        visible={settingsVisible}
        close={() => setSettingsVisible(false)}
      />

      <CreateItemModal
        list={props.list}
        visible={createItemVisible}
        close={() => setCreateItemVisible(false)}
      />
    </div>
  )
}

ListToolbar.propTypes = {
  list: PropTypes.object.isRequired
}

export default ListToolbar
