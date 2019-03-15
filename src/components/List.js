import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withFirestore } from 'react-redux-firebase'
import { withHandlers, compose } from 'recompose'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

import Items from '../containers/Items'
import AddItem from '../components/AddItem'
import DeleteButton from '../components/DeleteButton'

const ListContent = styled.div`
  background: lightgrey;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
`
const DropZone = styled.div`
  min-height: 250px;
  margin-bottom: 8px;
`
const ListHeader = styled.div`
  padding: 8px;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const ListDeleteButton = styled(DeleteButton) `
  opacity: 0;
  align-self: start;
  transition: all 0.2s;
  ${ListContent}:hover & {
    opacity: 1;
  }
`

const enhance = compose(
  withFirestore,
  withHandlers({
    onAdditem: (props) => (payload) => {
      // Attach an id to the item
      payload.id = Date.now()
      props.firestore.update(`lists/${props.id}`, {
        items: [
          ...props.items,
          payload,
        ]
      })
    },
    onDeleteItem: (props) => (index) => {
      props.firestore.update(`lists/${props.id}`, {
        items: [
          ...props.items.slice(0, index),
          ...props.items.slice(index + 1),
        ]
      })
    },
  }),
  connect((state) => ({
    profile: state.firebase.profile
  }))
)
const List = (props) => (
  <ListContent>
    <ListHeader>
      {props.title}
      {!props.profile.isEmpty && <ListDeleteButton for='list' onConfirm={props.onDeleteList}/> }
    </ListHeader>
    <Droppable droppableId={props.id}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
        >
          <div>
            <DropZone innerRef={provided.innerRef}>
              <Items
                profile={props.profile}
                data={props.items}
                onDeleteItem={props.onDeleteItem}
              />
              {provided.placeholder}
            </DropZone>
          </div>
        </div>
      )}
    </Droppable>
    { !props.profile.isEmpty && <AddItem onSubmit={props.onAdditem} /> }
  </ListContent>
)

List.propTypes = {
  style: PropTypes.object,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
}

export default enhance(List)