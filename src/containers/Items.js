import React from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import Item from '../components/Item/Item'
import { Empty, Button } from 'antd'
import { useSelector } from 'react-redux'
import { isEmpty } from 'react-redux-firebase'

const Items = (props) => {
  const auth = useSelector(({ firebase: { auth } }) => auth)
  const items = useSelector(
    ({
      firebase: {
        ordered: { items }
      }
    }) => items && items[props.list.id]
  )

  if (!isEmpty(items)) {
    return items.map((item, i) => (
      <Draggable key={item.key} index={i} draggableId={item.key} isDragDisabled={isEmpty(auth)}>
        {(provided, snapshot) => (
          <Item
            isDragging={snapshot.isDragging}
            provided={provided}
            item={{
              id: item.key,
              ...item.value
            }}
            list={props.list}
          />
        )}
      </Draggable>
    ))
  } else {
    return (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="There are no items">
        <Button type="primary" onClick={props.onCreate}>
          Create Item
        </Button>
      </Empty>
    )
  }
}

Items.propTypes = {
  list: PropTypes.object.isRequired,
  onCreate: PropTypes.func.isRequired
}

export default Items
