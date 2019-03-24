import React, { useState } from 'react'
import { connect } from 'react-redux'
import { compose} from 'recompose'
import { firestoreConnect } from 'react-redux-firebase'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { onDragEnd } from '../services/dragDrop';
import { get } from 'lodash';

import List from './List';

import TitleBar from '../components/TitleBar';

import {
    Box,
    Heading,
    IconButton,
    Spinner,
    Modal,
    Button,
    Label,
    Text,
    TextField,    
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
                where: ['boardId', '==', boardId],
            }
        ]
    }),
    connect((store, props) => {
        const { boards, lists } = store.firestore.data;
        const { boardId } = props.match.params;
        const { profile } = store.firebase;

        return {
            profile,
            lists: lists && Object.keys(lists).map((id) => ({
                id,
                ...lists[id]
            })),
            board: {
                id: boardId,
                ...get(boards, boardId)
            },
        }
    })
);

const Board = (props) => {
    const createList = (payload) => {
        console.log(props);
        return props.firestore.add(
            { collection: 'lists' },
            {
                ...payload,
                boardId: props.board && props.board.id,
            }
        )
    }

    if (!props.board) {
        return (
            <BoardWrapper justifyContent="center">
                <Spinner show accessibilityLabel="Loading board..." />
            </BoardWrapper>
        );
    }

    return (
        <BoardWrapper>
            <BoardBar
                boardName={props.board.name}
                onCreateList={createList}
            />
            {
                props.lists &&
                props.lists.map((list) => <List key={list.id} {...list}/>)
            }
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
            <Box display="flex">
                <IconButton
                    icon="ellipsis"
                    accessibilityLabel="Add list"
                />
                <CreateListButton
                    onSubmit={props.onCreateList}
                />
            </Box>
        </TitleBar>
    );
}

const CreateListButton = (props) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ name, setName ] = useState('');

    const handleSubmit = (event) => {
        if (event.type === 'submit') event.preventDefault();

        props.onSubmit({
            name,
        });
    }

    return (
        <Box>
            <IconButton
                icon="add"
                accessibilityLabel="Add list"
                onClick={() => setIsOpen(!isOpen)}
            />
            {
                isOpen &&
                <Modal
                    size="md"
                    accessibilityModalLabel="Create list"
                    accessibilityCloseLabel="Cancel"
                    onDismiss={() => setIsOpen(false)}
                    heading="Create list"
                    footer={
                        <Box display="flex" justifyContent="between">
                            <Button
                                inline
                                text="Cancel"
                                onClick={() => setIsOpen(false)}
                            />
                            <Button
                                inline
                                text="Submit"
                                color="blue"
                                onClick={handleSubmit}
                            />
                        </Box>
                    }
                >
                    <Box padding={2}>
                        <form onSubmit={handleSubmit}>
                            <Box marginBottom={4}>
                                <Box marginBottom={2}>
                                    <Label htmlFor="name">
                                        <Text>Name</Text>
                                    </Label>
                                </Box>
                                <TextField id="name"
                                    value={name}
                                    placeholder="List name"
                                    onChange={({ value }) => setName(value)}
                                />
                            </Box>
                        </form>
                    </Box>
                </Modal>
            }
        </Box>
    );
}

export default enhance(Board);