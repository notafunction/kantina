import React from 'react'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { onDragEnd } from '../services/dragDrop'

import styled from 'styled-components'
import { grid } from '../constants'
import Lists from './Lists'
import DeleteButton from '../components/DeleteButton'

const enhance = compose(
  firestoreConnect((props) => ([
    { collection: 'boards', doc: props.match.params.id }
  ])),
  withHandlers({
    deleteBoard: (props) => () => {
      props.firestore.delete(`boards/${props.match.params.id}`)
      .then(() => props.history.push('/'))
    }
  }),
  connect((state, props) => ({
    data: state.firestore.data.boards && state.firestore.data.boards[props.match.params.id],
    profile: state.firebase.profile
  }))
);

const BoardWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const BoardContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const BoardContent = styled.div`
  position: relative;
  flex-grow: 1;
`;

const BoardHeader = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  padding: 1rem;
  height: auto;
  justify-content: space-between;
`;

const Title = styled.h2`
  margin: 0;
  margin-right: ${grid}px;
`;

const Board = ({ data, ...props }) => {
  if (!isLoaded(data)) return 'Loading...'
  return (
    <BoardWrapper>
      <BoardContainer>
        <BoardHeader>
          <Title>{data.title}</Title>
          {
            !props.profile.isEmpty &&
            <DeleteButton
              for='board'
              placement='bottomRight'
              onConfirm={props.deleteBoard}
            />
          }
        </BoardHeader>
        <BoardContent>
          <DragDropContext onDragEnd={onDragEnd}>
            <Lists boardId={props.match.params.id} />
          </DragDropContext>
        </BoardContent>
      </BoardContainer>
    </BoardWrapper>
  )
}

export default enhance(Board)