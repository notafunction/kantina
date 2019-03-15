import React, { useState, useRef } from 'react'
import { compose, withHandlers, withState } from 'recompose'
import { connect } from 'react-redux'
import { isLoaded, isEmpty, withFirebase } from 'react-redux-firebase'
import styled from 'styled-components';

import { Link } from 'react-router-dom'
import { message, Divider } from 'antd'
import BoardMenu from '../components/BoardMenu'
import Auth from '../components/Auth'

import { Avatar, Box, IconButton, Flyout } from 'gestalt';

const Nav = styled.nav`
  height: 50px;
  width: 100%;
`;

const enhance = compose(
  withFirebase,
  withHandlers({
    logout: props => () => {
      props.firebase.logout()
      .then(() => message.success('You have logged out.'))
    },
    onAddBoard: props => payload => {
      props.firestore.add('boards', {
        userId: props.profile.id,
        ...payload,
      })
      .then(() => message.success('Board created!'))
    }
  }),
  connect(({ firebase }) => ({
    profile: firebase.profile
  }))
);

const NavBar = props => {
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);
  const menuAnchorRef = useRef(null);

  return (
    <Nav>
      <Box color="darkGray" shape="rounded" padding={3} display="flex">
        <Box width={40}>
          <Link to="/">
            <Avatar name="Kantina"/>          
          </Link>
        </Box>
        <Box flex="grow"></Box>
        <Box paddingX={1}>
          <IconButton
            accessibilityLabel="Hallo, world!"
            icon="face-happy"
          />
        </Box>
        <Box paddingX={2} ref={menuAnchorRef}>
          <IconButton
            icon="ellipsis"
            accessibilityLabel="menu"
            accessibilityHaspopup
            accessibilityExpanded={!!isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </Box>
        {
            isMenuOpen &&
            <Flyout
              anchor={menuAnchorRef.current}
              idealDirection="down"
              onDismiss={() => setIsMenuOpen(false)}
              size="sm"
            >
              <Box padding={3}>
                <Link to="/settings">Edit settings</Link>
                <Divider/>
                <Link to="/logout">Logout</Link>
              </Box>
            </Flyout>
          }
      </Box>
    </Nav>
  );
}

export default enhance(NavBar);