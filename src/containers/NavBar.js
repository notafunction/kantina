import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import BoardMenu from '../containers/BoardMenu';
import UserMenu from '../containers/UserMenu';
import LoginMenu from '../containers/LoginMenu';

import TitleBar from '../components/TitleBar';

import { Avatar, Box, Spinner } from 'gestalt';

const enhance = compose(
    connect((store) => ({
        profile: store.firebase.profile,
    })),
);

const NavBar = (props) => {
    const showUserMenu = () => {
        if (!props.profile.isLoaded) return <Spinner show accessibilityLabel="loading menu" />;
        if (props.profile.isEmpty) return <LoginMenu />;
        return <UserMenu profile={props.profile} />
    }

    return (
        <nav>
            <TitleBar>
                <Box width={40}>
                    <NavLink to="/">
                        <Avatar name="Kantina" />
                    </NavLink>
                </Box>
                <Box flex="grow"></Box>
                {!props.profile.isEmpty && <BoardMenu profile={props.profile}/>}
                {showUserMenu()}
            </TitleBar>
        </nav>
    );
}

export default enhance(NavBar);