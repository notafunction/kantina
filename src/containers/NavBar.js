import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import BoardMenu from '../containers/BoardMenu';
import MainMenu from '../containers/MainMenu';
import LoginMenu from '../containers/LoginMenu';

import { Avatar, Box, Spinner, Text } from 'gestalt';
import { capitalize } from '../services/helpers';

const enhance = compose(
    connect((store) => ({
        profile: store.firebase.profile,
    })),
);

const ProfileLink = (props) => {
    return (
        <NavLink to={`/${props.profile.username}`}>
            <Box
                shape="pill"
                color="white"
                alignItems="center"
                display="flex"
                padding={2}
                dangerouslySetInlineStyle={{
                    __style: {
                        textDecoration: 'none',
                        fontWeight: 'bold',
                    }
                }}
            >
                <Box>
                    <Avatar size="sm" name={props.profile.firstName} />
                </Box>
                <Box paddingX={2}>
                    <Text>{capitalize(props.profile.firstName)}</Text>
                </Box>
            </Box>
        </NavLink>
    );
}

const NavBar = (props) => {
    const showMainMenu = () => {
        if (!props.profile.isLoaded) return <Spinner show accessibilityLabel="loading menu" />;
        if (props.profile.isEmpty) return <LoginMenu />;
        return <MainMenu profile={props.profile} />
    }

    return (
        <nav>
            <Box
                margin={1}
                color="darkGray"
                shape="rounded"
                padding={3}
                display="flex"
                flex="grow"
            >
                <Box width={40}>
                    <NavLink to="/">
                        <Avatar name="Kantina" />
                    </NavLink>
                </Box>
                <Box flex="grow"></Box>
                {!props.profile.isEmpty && <ProfileLink profile={props.profile}/> }
                {!props.profile.isEmpty && <BoardMenu />}
                {showMainMenu()}
            </Box>
        </nav>
    );
}

export default enhance(NavBar);