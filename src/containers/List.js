import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import CreateItemModal from '../components/Item/CreateItemModal'
import Items from './Items'
import { useFirebaseConnect, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { ListSettingsDrawer, ListToolbar } from '../components/List'

const ListHeader = styled.div`
  padding: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  h3 {
    margin-bottom: 0;
    flex: 1;
  }
`
const ListContent = styled.div`
  max-height: 100%;
  background-color: ${(props) => props.itemColor};
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  white-space: normal;

  ${ListHeader} {
    .ant-dropdown-trigger {
      opacity: 0;
      transition: all 0.1s ease-in;

      &.ant-dropdown-open {
        opacity: 1;
      }
    }
  }

  &:hover {
    ${ListHeader} {
      .ant-dropdown-trigger {
        opacity: 1;
      }
    }
  }
`
const DropZone = styled.div`
  min-height: 250px;
  overflow: auto;
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

  return (
    <Droppable droppableId={props.list.id} type="ITEM">
      {(provided, _snapshot) => (
        <ListContent {...provided.droppableProps} itemColor={props.list.color}>
          <ListHeader>
            <h3 {...props.dragHandleProps}>{props.list.title}</h3>
            {!isEmpty(auth) && <ListToolbar handleClick={handleToolbarClick} />}
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
