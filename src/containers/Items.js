import React from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import Item from '../components/Item/Item'
import { Empty, Button, Spin } from 'antd'
import { useDatabase, useDatabaseListData, useSigninCheck } from 'reactfire'
import { query, ref } from 'firebase/database'

const Items = (props) => {
  const db = useDatabase()
  const items = useDatabaseListData(query(ref(db, `items/${props.list.id}`)), {
    idField: 'id'
  })
  const auth = useSigninCheck()

  if (items.status === 'loading') return <Spin />

  if (!items.data.length) {
    return (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="There are no items">
        {auth.status === 'loading' ? (
          <Spin />
        ) : auth.signedIn ? (
          <Button type="primary" onClick={props.onCreate}>
            Create Item
          </Button>
        ) : null}
      </Empty>
    )
  }

  return items.data.map((item, i) => (
    <Draggable
      key={item.id}
      index={i}
      draggableId={item.id}
      isDragDisabled={auth.status !== 'loading' && !auth.data.signedIn}>
      {(provided, snapshot) => (
        <Item isDragging={snapshot.isDragging} provided={provided} item={item} list={props.list} />
      )}
    </Draggable>
  ))
}

Items.propTypes = {
  list: PropTypes.object.isRequired,
  onCreate: PropTypes.func.isRequired
}

export default Items
