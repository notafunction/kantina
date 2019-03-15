import React, { useState, useRef } from 'react';
import { compose } from 'recompose';
import { Box, Flyout, IconButton } from 'gestalt';
import MenuLink from '../components/styled/MenuLink';

const enhance = compose(

);

const BoardMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef(null);

  return (
    <React.Fragment>
      <Box paddingX={1} ref={anchorRef}>
        <IconButton
          icon="view-type-default"
          accessibilityHaspopup
          accessibilityLabel="board menu"
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
            {/* <MenuLink to="/settings">Edit settings</MenuLink> */}
          </Box>
        </Flyout>
      }
    </React.Fragment>
  );
}

export default BoardMenu;