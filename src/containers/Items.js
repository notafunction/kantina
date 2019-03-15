import React from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

import Item from '../components/Item'

const ItemsContainer = styled.div``

const Items = (props) => {
  return (
    <ItemsContainer>
      {
        props.data.map((item, i) => (
            <Draggable
              key={i}
              index={i}
              draggableId={item.id}
              isDragDisabled={props.profile.isEmpty}>
              {(provided, snapshot) => (
                <div>
                  <Item
                    isLoggedIn={!props.profile.isEmpty}
                    isDragging={snapshot.isDragging}
                    provided={provided}
                    onDeleteItem={() => props.onDeleteItem(i)}
                    {...item}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Draggable>
        ))
      }
    </ItemsContainer>
  )
}

Items.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default Items