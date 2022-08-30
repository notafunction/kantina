import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import CreateItemModal from '../components/Item/CreateItemModal'
import Items from './Items'
import { ListSettingsDrawer, ListToolbar } from '../components/List'
import { useDatabase, useDatabaseList, useSigninCheck } from 'reactfire'
import { query, ref } from 'firebase/database'
import { Spin } from 'antd'

const Styled = {
  Header: styled.div`
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
  `,

  Dropzone: styled.div`
    min-height: 250px;
    overflow: auto;
  `
}

Styled.Content = styled.div`
  max-height: 100%;
  background-color: ${(props) => props.itemColor};
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  white-space: normal;

  ${Styled.Header} {
    .ant-dropdown-trigger {
      opacity: 0;
      transition: all 0.1s ease-in;

      &.ant-dropdown-open {
        opacity: 1;
      }
    }
  }

  &:hover {
    ${Styled.Header} {
      .ant-dropdown-trigger {
        opacity: 1;
      }
    }
  }
`

const List = (props) => {
  const db = useDatabase()
  const itemsQuery = query(ref(db, `items/${props.list.id}`))
  const { status, data: items } = useDatabaseList(itemsQuery, {
    idField: 'id'
  })
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
