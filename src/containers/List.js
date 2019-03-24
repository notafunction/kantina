import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { onDragEnd } from '../services/dragDrop';

import {
    Box,
    Heading,
} from 'gestalt';

const List = (props) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Box
                display="flex"
                direction="column"
                minWidth={200}
            >
                <Heading size="xs">{ props.name }</Heading>
            </Box>
        </DragDropContext>
    );
}

export default List;