import React from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import Item from '../components/Item/Item'
import { Empty, Button, Spin } from 'antd'
import { useDatabase, useDatabaseList, useSigninCheck } from 'reactfire'
import { orderByChild, query, ref } from 'firebase/database'

const Items = (props) => {
  const db = useDatabase()
  const itemsList = useDatabaseList(query(ref(db, `items/${props.list.id}`), orderByChild('order')))
  const auth = useSigninCheck()

  if (itemsList.status === 'loading') return <Spin />

  if (!itemsList.data.length) {
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

  return itemsList.data.map(({ snapshot }, i) => (
    <Draggable
      key={snapshot.key}
      index={i}
      draggableId={snapshot.key}
      isDragDisabled={auth.status !== 'loading' && !auth.data.signedIn}>
      {(provided, draggableSnapshot) => (
        <Item
          isDragging={draggableSnapshot.isDragging}
          provided={provided}
          item={{
            id: snapshot.key,
            ...snapshot.val()
          }}
          list={props.list}
        />
      )}
    </Draggable>
  ))
}

Items.propTypes = {
  list: PropTypes.object.isRequired,
  onCreate: PropTypes.func.isRequired
}

export default Items
