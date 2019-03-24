import React from 'react';

import List from './List';

import {
    Box,
} from 'gestalt';

const Lists = (props) => {
    return (
        <Box
            display="flex"
            flex="grow"
            overflow="scrollX"
        >
        {
            props.lists.map((list) => (
                <List {...list}
                    key={list.id}
                />
            ))
        }
        </Box>
    );
}

export default Lists;