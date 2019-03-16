import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

const enhance = compose(
    firestoreConnect((props) => ([
        `profiles/${props.match.params.uid}`
    ])),
    connect(({ firestore }, props) => ({
        user: firestore.data.profiles[props.match.params.uid] || null,
    })),
);

const Profile = (props) => {
    if (!props.user) return <div>not found</div>;

    return (
        <div>
            { props.user.firstName },
            { props.user.email }
        </div>
    )
}

export default enhance(Profile);