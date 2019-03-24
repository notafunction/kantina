import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { onDragEnd } from '../services/dragDrop';

import {
    Box,
} from 'gestalt';

const List = (props) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div>{ props.name }</div>
        </DragDropContext>
    );
}

export default List;