import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import { firestoreConnect } from 'react-redux-firebase'
import styled from 'styled-components'

import List from '../components/List'
import AddList from '../components/AddList'

const ListWrapper = styled.div`
  display: inline-block;
  margin: 0 5px;
  height: 100%;
  width: 270px;
  vertical-align: top;
  :first-child {
    margin-left: 1rem;
  }
  :last-child {
    margin-right: 1rem;
  }
`
const ListsContainer = styled.div`
  user-select: none;
  white-space: nowrap;
  margin-bottom: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 1rem;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const enhance = compose(
  firestoreConnect((props) => ([
    { collection: 'lists', where: ['boardId', '==', props.boardId], orderBy: ['createdAt'] }
  ])),
  withHandlers({
    onAddList: (props) => (payload) => {
      props.firestore.add('lists', {
        boardId: props.boardId,
        items: [],
        createdAt: props.firestore.FieldValue.serverTimestamp(),
        updatedAt: props.firestore.FieldValue.serverTimestamp(),
        ...payload,
      })
    },
    onDeleteList: (props) => (id) => {
      props.firestore.delete(`lists/${id}`)
    }
  }),
  connect((state) => ({
    lists: state.firestore.ordered.lists,
    profile: state.firebase.profile,
  }))
)

const Lists = (props) => {
  if (props.lists) {
  return (
    <ListsContainer>
      {
        props.lists.map((list, i) => (
          <ListWrapper key={i}>
            <List
              onDeleteList={() => props.onDeleteList(list.id)}
              {...list}
            />
          </ListWrapper>
        ))
      }
      {
        !props.profile.isEmpty && 
        <ListWrapper>
          <AddList onSubmit={props.onAddList} />
        </ListWrapper>
      }
    </ListsContainer>
  )
  } else {
    return 'Loading...'
  }
}

Lists.propTypes = {
  boardId: PropTypes.string.isRequired,
}

export default enhance(Lists)