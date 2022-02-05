/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Dropdown, Menu } from 'antd'
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { DeleteOutlined, EllipsisOutlined } from '@ant-design/icons'
import { isEmpty, useFirebase } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import UserAvatar from '../User/UserAvatar'

const ItemToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.2rem;
`
const ItemContent = styled.div`
  box-shadow: ${({ isDragging }) => (isDragging ? '2px 2px 5px rgba(0, 0, 0, 0.2)' : 'none')};
  background-color: ${(props) => props.itemColor};
  transition: background 0.2s ease;
  padding: 0.5rem;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.2);
  transition: all 0.1s ease-in;

  > span {
    overflow: hidden;
    display: block;
    word-wrap: break-word;
  }
`
const ItemContainer = styled.div`
  margin: 0 8px;
  margin-bottom: 8px;
  user-select: none;
  max-width: 100%;

  &:focus {
    outline: 2px solid eggplant;
    box-shadow: none;
  }

  ${ItemToolbar} > .ant-dropdown-button {
    opacity: 0;
    transition: all 0.1s ease-in;
  }

  &:hover {
    ${ItemToolbar} > .ant-dropdown-button {
      opacity: 1;
    }
  }
`

const Item = (props) => {
  const firebase = useFirebase()
  const auth = useSelector(({ firebase: { auth } }) => auth)
  const creator = useSelector(({ firebase: { data } }) => data.users[props.item.value.createdBy])

  const onDeleteItem = async () => {
    firebase.ref(`items/${props.list.id}/${props.item.key}`).remove()
  }

  const itemMenu = (
    <Menu>
      <Menu.Item icon={<DeleteOutlined />} onClick={onDeleteItem} key="$delete">
        Delete
      </Menu.Item>
    </Menu>
  )

  return (
    <ItemContainer
      ref={props.provided.innerRef}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}>
      <ItemContent isDragging={props.isDragging} itemColor={props.item.value.color}>
        <ItemToolbar>
          {creator && <UserAvatar user={creator} size="small" />}
          {!isEmpty(auth) && (
            <Dropdown.Button
              trigger="click"
              size="small"
              type="text"
              icon={<EllipsisOutlined />}
              overlay={itemMenu}
            />
          )}
        </ItemToolbar>
        <div>{props.item.value.content}</div>
      </ItemContent>
    </ItemContainer>
  )
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  provided: PropTypes.object.isRequired
}

export default Item
