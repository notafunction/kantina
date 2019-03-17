import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import { firestoreConnect } from 'react-redux-firebase'

import List from '../components/List'
import AddList from '../components/AddList'

import {
  Box,
} from 'gestalt';

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
    <Box>
      {
        props.lists.map((list, i) => (
          <Box key={i}>
            <List
              onDeleteList={() => props.onDeleteList(list.id)}
              {...list}
            />
          </Box>
        ))
      }
      {
        !props.profile.isEmpty && 
        <Box>
          <AddList onSubmit={props.onAddList} />
        </Box>
      }
    </Box>
  )
  } else {
    return 'Loading...'
  }
}

Lists.propTypes = {
  boardId: PropTypes.string.isRequired,
}

export default enhance(Lists)