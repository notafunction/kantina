import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { firestoreConnect } from 'react-redux-firebase';

import Lists from './Lists';

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
        ];
    }),
    connect((store, props) => {
        const { boards } = store.firestore.data;
        const { lists } = store.firestore.ordered;
        const { boardId } = props.match.params;
        const { profile } = store.firebase;

        return {
            profile,
            lists: lists && Object.keys(lists).map((id) => ({
                id,
                ...lists[id]
            })),
            board: boards && {
                id: boardId,
                ...boards[boardId],
            },
        }
    })
);

const Board = (props) => {
    const { firestore } = props;

    const firestoreCreateList = (payload) => {
        return firestore.add(
            { collection: 'lists' },
            {
                ...payload,
                items: [],
                boardId: props.board && props.board.id,
                createdAt: firestore.FieldValue.serverTimestamp(),
            }
        )
    }

    const firestoreDeleteBoard = () => {
        return firestore.delete({
            collection: 'boards',
            doc: props.board.id,
        }).then((result) => props.history.push('/'));
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
                onCreateList={firestoreCreateList}
                onDeleteBoard={firestoreDeleteBoard}
            />
            {
                props.lists &&
                <Lists lists={props.lists}/>
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
};

const BoardBar = (props) => {
    return (
        <TitleBar color="lightWash">
            <Heading size="sm">{ props.boardName }</Heading>
            <Box display="flex">
                <IconButton
                    icon="remove"
                    accessibilityLabel="Delete board"
                    onClick={props.onDeleteBoard}
                />
                <CreateListButton
                    onSubmit={props.onCreateList}
                />
            </Box>
        </TitleBar>
    );
};

const CreateListButton = (props) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ name, setName ] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleSubmit();
    }

    const handleSubmit = () => {
        props.onSubmit({
            name,
        }).then((result) => {
            setName('');
            setIsOpen(false);
        });
    }

    return (
        <Box display="flex">
            <IconButton
                icon="add"
                accessibilityHaspopup
                accessibilityLabel="Add list"
                accessibilityExpanded={isOpen}
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
                    <Box padding={4}>
                        <form onSubmit={handleFormSubmit}>
                            <Box>
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
};

export default enhance(Board);