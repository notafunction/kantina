import React, { useState, useRef } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import MenuLink from '../components/styled/MenuLink';
import { firestoreConnect, withFirebase } from 'react-redux-firebase';

import { Box, Flyout, IconButton, Heading, Text, Label, TextField, Button, Modal } from 'gestalt';

const enhance = compose(
    withFirebase,
    firestoreConnect((props) => ([
        { collection: 'boards', where: ['uid', '==', props.profile.id] }
    ])),
    connect((store) => ({
        boards: store.firestore.ordered && store.firestore.ordered.boards,
    })),
);

const BoardMenu = (props) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isBoardFormOpen, setIsBoardFormOpen ] = useState(false);
    const anchorRef = useRef(null);

    const toggleBoardFormModal = () => {
        setIsBoardFormOpen(!isBoardFormOpen);
    }

    const handleCreateBoard = (payload) => {
        console.log(payload, props.firestore);
    }

    return (
        <React.Fragment>
            <Box paddingX={1} ref={anchorRef}>
                <IconButton
                    icon="view-type-default"
                    accessibilityHaspopup
                    accessibilityLabel="board menu"
                    accessibilityExpanded={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                />
            </Box>
            {
                isOpen &&
                <Flyout
                    anchor={anchorRef.current}
                    idealDirection="down"
                    onDismiss={() => setIsOpen(false)}
                    size="md"
                >
                    <Box
                        flex="grow"
                        padding={2}
                        display="flex"
                        direction="column"
                    >
                        <Box
                            display="flex"
                            flex="grow"
                            justifyContent="between"
                            alignItems="center"
                        >
                            <Heading size="xs">Boards</Heading>
                            <IconButton
                                accessibilityLabel="create board"
                                icon="add"
                                size="sm"
                                onClick={toggleBoardFormModal}
                            />
                        </Box>
                        {
                            props.boards.length
                            ? props.boards.map((board) => (
                                <MenuLink to={`/board/${board.id}`}>{ board.name }</MenuLink>
                            ))
                            : <Box marginTop={12} marginBottom={12} display="flex" flex="grow">
                                <Box paddingX={4}>
                                    <Text align="center">Create boards to organize and share ideas!</Text>
                                </Box>
                            </Box>
                        }
                    </Box>
                </Flyout>
            }
            {
                isBoardFormOpen && 
                <NewBoardForm
                    toggle={toggleBoardFormModal}
                    onSubmit={handleCreateBoard}
                /> 
            }
        </React.Fragment>
    );
}

const NewBoardForm = (props) => {
    const [ name, setName ] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit({
            name,
        });
    }

    return (
        <Modal
            accessibilityCloseLabel="cancel"
            accessibilityModalLabel="create new board"
            heading="New board"
            onDismiss={props.toggle}
            size="sm"
        >
            <form onSubmit={handleSubmit}>
                <Box marginBottom={4}>
                    <Box marginBottom={2}>
                        <Label htmlFor="name">
                            <Text>Name</Text>
                        </Label>
                    </Box>
                    <TextField id="name"
                        value={name}
                        onChange={({ value }) => setName(value)}
                    />
                </Box>
                <Box display="flex" justifyContent="between">
                    <Button inline
                        text="Cancel"
                        color="red"
                        onClick={props.toggle}
                    />
                    <Button inline
                        text="Create"
                        color="blue"
                        type="submit"
                    />
                </Box>
            </form>
        </Modal>
    );
}

export default enhance(BoardMenu);