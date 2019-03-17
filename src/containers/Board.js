import React from 'react'
import { connect } from 'react-redux'
import { compose} from 'recompose'
import { firestoreConnect } from 'react-redux-firebase'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { onDragEnd } from '../services/dragDrop';
import { get } from 'lodash';

import Lists from './Lists'

import {
    Box,
    Heading,
    IconButton,
} from 'gestalt';

const enhance = compose(
    firestoreConnect((props) => {
        const { boardId } = props.match.params; 

        return [
            {
                collection: 'boards',
                doc: boardId,
            },
            {
                collection: 'lists',
                where: ['boardId', '==', boardId]
            }
        ]
    }),
    connect((store, props) => {
        const { boards, lists } = store.firestore.data;
        const { boardId } = props.match.params;

        return {
            profile: firebase.profile,
            board: get(boards, boardId),
            lists,
        }
    })
);

const Board = (props) => {
    return (
        <Box
            display="flex"
            direction="column"
        >
            <Box>
                <Heading size="sm">{ props.board.name }</Heading>
                <IconButton
                    icon="ellipsis"
                    accessibilityLabel="Board settings"
                />
            </Box>
            <DragDropContext onDragEnd={onDragEnd}>
                {
                    props.lists.map((list) => console.log(list))
                }
            </DragDropContext>
        </Box>
    )
}

export default enhance(Board)