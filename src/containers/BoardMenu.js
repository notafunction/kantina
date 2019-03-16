import React, { useState, useRef } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Box, Flyout, IconButton, Heading, Text } from 'gestalt';
import MenuLink from '../components/styled/MenuLink';
import { firestoreConnect, withFirebase } from 'react-redux-firebase';

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
    const [isOpen, setIsOpen] = useState(false);
    const anchorRef = useRef(null);

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
        </React.Fragment>
    );
}

export default enhance(BoardMenu);