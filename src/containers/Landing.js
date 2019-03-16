import React from 'react';

import { Text, Box } from 'gestalt';

const Landing = (props) => {
    return (
        <Box
            display="flex"
            direction="column"
            flex="grow"
            justifyContent="center"
            alignItems="center"
        >
            <Text>Kantina</Text>
        </Box>
    );
}

export default Landing;