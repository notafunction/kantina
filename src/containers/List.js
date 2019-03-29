import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';
import { onDragEnd } from '../services/dragDrop';
import { Droppable } from 'react-beautiful-dnd';

import CreateItemModal from '../components/CreateItemModal';

import {
    Box,
    Heading,
    Divider,
    IconButton,
} from 'gestalt';

const enhance = compose(
    withFirestore,
);

const List = (props) => {
    const firestoreCreateItem = (payload) => {
        return props.firestore.update(
            { 
                collection: 'lists',
                doc: props.id,
            },
            {
                items: [
                    ...props.items,
                    {
                        ...payload,
                        id: Date.now(),
                    }
                ]
            }
        )
    }

    const firestoreDeleteItem = (id) => {
        props.firestore.update(
            {
                collection: 'lists',
                doc: props.id,
            },
            {
                items: props.items.filter((item) => item.id !== id),
            }
        )
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Box
                display="flex"
                direction="column"
                minWidth={200}
                marginRight={2}
                color="white"
                shape="rounded"
            >
                <ListHeader>{ props.name }</ListHeader>
                <Box flex="grow">
                </Box>
                <ListFooter>
                    <CreateItemButton
                        onSubmit={firestoreCreateItem}
                    />
                </ListFooter>
            </Box>
        </DragDropContext>
    );
};

const ListHeader = ({ children, ...props }) => (
    <Box>
        <Box padding={2} shape="roundedTop">
            <Heading size="xs">{ children }</Heading>
        </Box>
        <Divider />
    </Box>
);

const ListFooter = ({ children, ...props }) => {
    return (
        <Box display="flex" justifyContent="end">
            { children }
        </Box>
    );
}

const CreateItemButton = (props) => {
    const [ isOpen, setIsOpen ] = useState(false);

    return (
        <Box>
            <IconButton
                icon="add"
                accessibilityHaspopup
                accessibilityLabel="Add item"
                accessibilityExpanded={isOpen}
                onClick={() => setIsOpen(true)}
            />
            {
                isOpen &&
                <CreateItemModal
                    onSubmit={props.onSubmit}
                    onDismiss={() => setIsOpen(false)}
                />
            }
        </Box>
    )
}

export default enhance(List);