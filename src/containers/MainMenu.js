import React, { useState, useRef } from 'react';
import { Box, Flyout, IconButton } from 'gestalt';
import { compose } from 'recompose';
import { withFirebase } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';

import MenuLink from '../components/styled/MenuLink';

const enhance = compose(
    withFirebase,
    withRouter,
);

const MainMenu = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const anchorRef = useRef(null);

    const logout = () => {
        props.firebase.logout().then(() => {
            
        });
    }

    return (
        <React.Fragment>
            <Box paddingX={2} ref={anchorRef}>
                <IconButton
                    icon="ellipsis"
                    accessibilityHaspopup
                    accessibilityLabel="main menu"
                    accessibilityExpanded={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                />
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
                        <MenuLink to="/" onClick={logout}>Logout</MenuLink>
                    </Box>
                </Flyout>
            }
        </React.Fragment>
    );
}

export default enhance(MainMenu);