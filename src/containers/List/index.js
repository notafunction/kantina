import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Droppable } from 'react-beautiful-dnd'
import CreateItemModal from '../../components/Item/CreateItemModal'
import Items from '../Items'
import { ListSettingsDrawer, ListToolbar } from '../../components/List'
import { useSigninCheck } from 'reactfire'
import { Spin } from 'antd'
import Styled from './components/Styled'

const List = (props) => {
  const { status: authStatus, data: authData } = useSigninCheck()

  const [createItemModalVisible, setCreateItemModalVisible] = useState(false)
  const [settingsVisible, setSettingsVisible] = useState(false)

  const handleToolbarClick = (event) => {
    switch (event.key) {
      case 'item:create': {
        setCreateItemModalVisible(true)
        break
      }
      case 'list:settings': {
        setSettingsVisible(true)
      }
    }
  }

  if (status === 'loading' || authStatus === 'loading') return <Spin />

  return (
    <Droppable droppableId={props.list.id} type="ITEM">
      {(provided, _snapshot) => (
        <Styled.Content {...provided.droppableProps} itemColor={props.list.color}>
          <Styled.Header>
            <h3 {...props.dragHandleProps}>{props.list.title}</h3>
            {authData.signedIn && <ListToolbar handleClick={handleToolbarClick} />}
          </Styled.Header>
          <Styled.Dropzone ref={provided.innerRef}>
            <Items list={props.list} onCreate={() => setCreateItemModalVisible(true)} />
            {provided.placeholder}
          </Styled.Dropzone>

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
        </Styled.Content>
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
