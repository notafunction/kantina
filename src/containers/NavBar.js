import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { NavLink, withRouter } from 'react-router-dom';

import BoardMenu from '../containers/BoardMenu';
import MainMenu from '../containers/MainMenu';
import LoginMenu from '../containers/LoginMenu';

import { Avatar, Box, Spinner } from 'gestalt';

const enhance = compose(
  connect((store) => ({
    profile: store.firebase.profile,
  })),
);

const NavBar = (props) => {
  const showMainMenu = () => {
    if (!props.profile.isLoaded) return <Spinner show accessibilityLabel="loading menu"/>;
    if (props.profile.isEmpty) return <LoginMenu/>;
    return <MainMenu {...props.profile}/>
  }

  return (
    <nav>
      <Box color="darkGray" shape="rounded" padding={3} display="flex">
        <Box width={40}>
          <NavLink to="/">
            <Avatar name="Kantina"/>          
          </NavLink>
        </Box>
        <Box flex="grow"></Box>
        { !props.profile.isEmpty && <BoardMenu/> }
        { showMainMenu() }
      </Box>
    </nav>
  );
}

export default enhance(NavBar);