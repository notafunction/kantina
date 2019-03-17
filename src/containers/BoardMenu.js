import React, { useState, useRef } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import MenuLink from '../components/styled/MenuLink';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';

import {
    Box,
    Flyout,
    IconButton,
    Heading,
    Text,
    Modal,
    Label,
    TextField,
    Switch,
    Button,
} from 'gestalt';

const enhance = compose(
    withFirestore,
    firestoreConnect((props) => ([
        { collection: 'boards', where: [
            ['ownerId', '==', props.profile.id],
        ] }
    ])),
    connect((store) => ({
        boards: store.firestore.ordered && store.firestore.ordered.boards,
    })),
);

const BoardMenu = (props) => {
    const [ showMenu, setShowMenu ] = useState(false);
    const [ showCreate, setShowCreate ] = useState(false);
    const anchorRef = useRef(null);

    const createBoard = (payload) => {
        return props.firestore.add(
            { collection: 'boards' },
            {
                ...payload,
                ownerId: props.profile.id,
            },
        );
    }

    return (
        <React.Fragment>
            <Box paddingX={1} ref={anchorRef}>
                <IconButton
                    icon="view-type-default"
                    accessibilityHaspopup
                    accessibilityLabel="board menu"
                    accessibilityExpanded={showMenu}
                    onClick={() => setShowMenu(!showMenu)}
                />
            </Box>
            { // Board list menu
                showMenu &&
                <Flyout
                    anchor={anchorRef.current}
                    idealDirection="down"
                    onDismiss={() => setShowMenu(false)}
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
                                onClick={() => setShowCreate(true)}
                            />
                        </Box>
                        {
                            props.boards.length
                            ? props.boards.map((board) => (
                                <MenuLink key={board.id} to={`/board/${board.id}`}>{ board.name }</MenuLink>
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
            { // Board create form
                showCreate &&
                <CreateForm
                    onDismiss={() => setShowCreate(false)}
                    onSubmit={createBoard}
                />
            }
        </React.Fragment>
    );
}

const CreateForm = (props) => {
    const [ name, setName ] = useState('');
    const [ isPrivate, setIsPrivate ] = useState(false);

    const handleSubmit = (event) => {
        if (event.type === 'submit') event.preventDefault();

        props.onSubmit({
            name,
            isPrivate,
        }).then((docRef) => {
            props.history.push(`/boards/${docRef.id}`)
        });
    }

    return (
        <Modal
            size="md"
            accessibilityModalLabel="Create board"
            accessibilityCloseLabel="Cancel"
            onDismiss={props.onDismiss}
            heading="Create board"
            footer={
                <Box display="flex" justifyContent="between">
                    <Button
                        inline
                        text="Cancel"
                        onClick={props.onDismiss}
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
                            placeholder="Board name"
                            onChange={({ value }) => setName(value)}
                        />
                    </Box>
                    <Box display="flex" alignItems="center" marginBottom={4}>
                        <Box paddingX={2} flex="grow">
                            <Label htmlFor="isPrivate">
                                <Text>Private</Text>
                            </Label>
                        </Box>
                        <Switch
                            id="isPrivate"
                            switched={isPrivate}
                            onChange={() => setIsPrivate(!isPrivate)}
                        />
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}

export default enhance(BoardMenu);