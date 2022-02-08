import React from 'react'
import { Dropdown, Menu } from 'antd'
import PropTypes from 'prop-types'
import { DeleteOutlined } from '@ant-design/icons'

const ItemToolbar = ({ handleClick, ...props }) => {
  const menu = (
    <Menu onClick={handleClick}>
      <Menu.Item key="item:delete" icon={<DeleteOutlined />}>
        Delete
      </Menu.Item>
    </Menu>
  )

  return <Dropdown.Button trigger="click" size="small" type="ghost" overlay={menu} {...props} />
}

ItemToolbar.propTypes = {
  handleClick: PropTypes.func.isRequired
}

export default ItemToolbar
