import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { get } from 'lodash';

import { Box, Text } from 'gestalt';

const enhance = compose(
    firestoreConnect((props) => ([
        `profiles/${props.match.params.uid}`
    ])),
    connect(({ firestore }, props) => ({
        user: get(firestore, `data.profiles.${props.match.params.uid}`),
    })),
);

const Profile = (props) => {

    return (
        <Box
            display="flex"
            flex="grow"
            justifyContent="center"
            alignItems="center"
        >
            <Text>
                {
                    props.user
                        ? JSON.stringify(props.user)
                        : "These aren't the droids you're looking for..."
                }
            </Text>
        </Box>
    )
}

export default enhance(Profile);