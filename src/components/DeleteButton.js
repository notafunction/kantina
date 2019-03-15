import React from 'react'
import { Popconfirm, Tooltip } from 'antd'
import { Icon } from './Icon'

const DeleteButton = props => (
  <Popconfirm
    placement={props.placement || 'bottomRight'}
    title={`Really delete this ${props.for}?`}
    onConfirm={props.onConfirm}
    onCancel={props.onCancel}
    okText='Yes'
    okType='danger'
    cancelText='No'
  >
    <Icon className={props.className}>
      <span role='img' title={`Delete ${props.for}`} aria-label={`Delete ${props.for}`}>
        ❌
      </span>
    </Icon>
  </Popconfirm>
)

export default DeleteButton