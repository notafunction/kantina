import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import CreateItemModal from '../components/Item/CreateItemModal'
import Items from './Items'
import { Menu, Dropdown } from 'antd'
import { SettingOutlined, PlusOutlined } from '@ant-design/icons'
import { useFirebaseConnect, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { ListSettingsDrawer } from '../components/List'

const ListContent = styled.div`
  max-height: 100%;
  background-color: ${(props) => (props.color ? props.color.hex : 'lightgrey')};
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  white-space: normal;
`
const DropZone = styled.div`
  min-height: 250px;
  overflow: auto;
`
const ListHeader = styled.div`
  padding: 8px;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;

  h3 {
    margin-bottom: 0;
    flex: 1;
  }
`

const List = (props) => {
  useFirebaseConnect([
    {
      path: `items/${props.list.id}`,
      queryParams: ['orderByChild=order'],
      populates: [{ child: 'createdBy', root: 'users' }]
    }
  ])
  const [createItemModalVisible, setCreateItemModalVisible] = useState(false)
  const [settingsVisible, setSettingsVisible] = useState(false)
  const auth = useSelector(({ firebase: { auth } }) => auth)

  const listOptionsMenu = (
    <Menu>
      <Menu.Item key="1" icon={<PlusOutlined />} onClick={() => setCreateItemModalVisible(true)}>
        Create Item
      </Menu.Item>
      <Menu.Item key="2" icon={<SettingOutlined />} onClick={() => setSettingsVisible(true)}>
        List Settings
      </Menu.Item>
    </Menu>
  )

  return (
    <Droppable droppableId={props.list.id} type="ITEM">
      {(provided, _snapshot) => (
        <ListContent {...provided.droppableProps} color={props.list.color}>
          <ListHeader>
            <h3 {...props.dragHandleProps}>{props.list.title}</h3>
            {!isEmpty(auth) && (
              <Dropdown.Button
                overlay={listOptionsMenu}
                onClick={() => setCreateItemModalVisible(true)}
              />
            )}
          </ListHeader>
          <DropZone ref={provided.innerRef}>
            <Items list={props.list} onCreate={() => setCreateItemModalVisible(true)} />
            {provided.placeholder}
          </DropZone>

          <CreateItemModal
            list={props.list}
            visible={createItemModalVisible}
            close={() => setCreateItemModalVisible(false)}
          />

          <ListSettingsDrawer
            visible={settingsVisible}
            close={() => setSettingsVisible(false)}
            list={props.list}
          />
        </ListContent>
      )}
    </Droppable>
  )
}

List.propTypes = {
  list: PropTypes.object.isRequired,
  dragHandleProps: PropTypes.object,
  isDragging: PropTypes.bool.isRequired
}

export default List
