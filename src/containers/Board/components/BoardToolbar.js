import React from 'react'
import { Dropdown, Menu } from 'antd'
import PropTypes from 'prop-types'
import { PlusOutlined, SettingOutlined } from '@ant-design/icons'

const BoardToolbar = ({ handleClick, ...props }) => {
  const menu = (
    <Menu onClick={handleClick}>
      <Menu.Item key="list:create" icon={<PlusOutlined />}>
        Create List
      </Menu.Item>
      <Menu.Item key="board:settings" icon={<SettingOutlined />}>
        Board Settings
      </Menu.Item>
    </Menu>
  )

  return <Dropdown.Button trigger="click" type="ghost" overlay={menu} {...props} />
}

BoardToolbar.propTypes = {
  handleClick: PropTypes.func.isRequired
}

export default BoardToolbar
