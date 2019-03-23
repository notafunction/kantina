import React from 'react'
import { connect } from 'react-redux'
import { compose} from 'recompose'
import { firestoreConnect } from 'react-redux-firebase'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { onDragEnd } from '../services/dragDrop';
import { get } from 'lodash';

import Lists from './Lists';

import TitleBar from '../components/TitleBar';

import {
    Box,
    Heading,
    IconButton,
    Spinner,
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
        const { profile } = store.firebase;

        return {
            profile,
            lists,
            board: get(boards, boardId),
        }
    })
);

const Board = (props) => {

    if (!props.board) {
        return (
            <BoardWrapper justifyContent="center">
                <Spinner show accessibilityLabel="Loading board..." />
            </BoardWrapper>
        );
    }

    return (
        <BoardWrapper>
            <BoardBar boardName={props.board.name}/>
            { renderLists(props.lists) }
        </BoardWrapper>
    );
};

const BoardWrapper = ({ children, ...props }) => {
    return (
        <Box
            display="flex"
            direction="column"
            color="lightWash"
            flex="grow"
            shape="rounded"
            {...props}
        >
            { children }
        </Box>
    );
}

const BoardBar = (props) => {
    return (
        <TitleBar color="lightWash">
            <Heading size="sm">{ props.boardName }</Heading>
            <IconButton
                icon="add"
                accessibilityLabel="Add list"
            />
            <IconButton
                icon="add"
                accessibilityLabel="Add list"
            />
        </TitleBar>
    );
}

const renderLists = (lists) => {
    if (!lists) return null;

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {
                lists.map((list) => console.log(list))
            }
        </DragDropContext>
    );
}

export default enhance(Board);