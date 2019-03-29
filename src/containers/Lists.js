import React from 'react';

import List from './List';

import {
    Box,
} from 'gestalt';

const Lists = (props) => {
    return (
        <Box paddingX={2} display="flex" height="100%">
            <Box
                display="flex"
                flex="grow"
                overflow="scrollX"
                paddingY={3}
            >
            {
                props.lists.map((list) => (
                    <List {...list}
                        key={list.id}
                    />
                ))
            }
            </Box>
        </Box>
    );
}

export default Lists;