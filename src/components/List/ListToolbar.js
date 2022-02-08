import React from 'react'
import { Dropdown, Menu } from 'antd'
import PropTypes from 'prop-types'
import { PlusOutlined, SettingOutlined } from '@ant-design/icons'

const ListToolbar = ({ handleClick, ...props }) => {
  const menu = (
    <Menu onClick={handleClick}>
      <Menu.Item key="item:create" icon={<PlusOutlined />}>
        Create Item
      </Menu.Item>
      <Menu.Item key="list:settings" icon={<SettingOutlined />}>
        List Settings
      </Menu.Item>
    </Menu>
  )

  return <Dropdown.Button trigger="click" size="small" type="ghost" overlay={menu} {...props} />
}

ListToolbar.propTypes = {
  handleClick: PropTypes.func.isRequired
}

export default ListToolbar
