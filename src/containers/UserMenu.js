import React, { useState, useRef } from 'react';
import { compose } from 'recompose';
import { withFirebase } from 'react-redux-firebase';

import { Box, Flyout, Avatar, Text } from 'gestalt';

import MenuLink from '../components/styled/MenuLink';

import { capitalize } from '../services/helpers';

const enhance = compose(
    withFirebase,
);

const UserMenu = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const anchorRef = useRef(null);

    const logout = () => {
        props.firebase.logout();
    }

    return (
        <React.Fragment>
            <Box paddingX={2} ref={anchorRef}>
                <div style={{ cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
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
                </div>
            </Box>
            {
                isOpen &&
                <Flyout
                    anchor={anchorRef.current}
                    idealDirection="down"
                    onDismiss={() => setIsOpen(false)}
                    size="sm"
                >
                    <Box display="flex" direction="column" flex="grow">
                        <MenuLink to="/settings">Edit settings</MenuLink>
                        <MenuLink to="/" onClick={logout}>Log out</MenuLink>
                    </Box>
                </Flyout>
            }
        </React.Fragment>
    );
}

export default enhance(UserMenu);