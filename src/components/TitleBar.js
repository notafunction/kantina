import React from 'react';

import { Box } from 'gestalt';

const TitleBar = ({ children, ...props }) => {
    return (
        <Box
            color="darkGray"
            shape="rounded"
            padding={3}
            display="flex"
            marginBottom={2}
            justifyContent="between"
            {...props}
        >
            { children }
        </Box>
    );
}

export default TitleBar;