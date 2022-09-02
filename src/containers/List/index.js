import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Droppable } from 'react-beautiful-dnd'
import CreateItemModal from '../../components/Item/CreateItemModal'
import Item from '../../components/Item/Item'
import { ListSettingsDrawer, ListToolbar } from '../../components/List'
import { useDatabase, useDatabaseObjectData, useSigninCheck } from 'reactfire'
import { Spin } from 'antd'
import Styled from './components/Styled'
import { get, ref } from 'firebase/database'

const List = (props) => {
  const { status: authStatus, data: authData } = useSigninCheck()
  const db = useDatabase()
  const listItems = useDatabaseObjectData(ref(db, `lists/${props.list.id}/items`), {
    idField: false
  })

  const [items, setItems] = useState([])

  useEffect(() => {
    if (listItems.status === 'loading') return
    if (listItems.data === null) return

    const fetchData = async () => {
      const itemIds = Object.keys(listItems.data)

      const items = await Promise.all(
        itemIds.map(async (id) => {
          const snap = await get(ref(db, `items/${id}`))

          if (snap.exists()) {
            return {
              id,
              ...snap.val()
            }
          }
        })
      )

      console.log('items', items)

      setItems(items)
    }

    fetchData().catch(console.error)
  }, [listItems])

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

  return (
    <Droppable droppableId={props.list.id} type="ITEM">
      {(provided, _snapshot) => (
        <Styled.Content {...provided.droppableProps} itemColor={props.list.color}>
          <Styled.Header>
            <h3 {...props.dragHandleProps}>{props.list.title}</h3>
            {authData.signedIn && <ListToolbar handleClick={handleToolbarClick} />}
          </Styled.Header>
          <Styled.Dropzone ref={provided.innerRef}>
            {items.map((item) => (
              <Item key={item.id} item={item} list={props.list} provided={provided} />
            ))}
            {/* <Items list={props.list} onCreate={() => setCreateItemModalVisible(true)} />
            {provided.placeholder} */}
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
