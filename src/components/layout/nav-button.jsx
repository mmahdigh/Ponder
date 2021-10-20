import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function NavButton({ children, ...props }) {
  return (
    <li>
      <Button
        as={NavLink}
        {...props}

      >
        {children}
      </Button>
    </li>
  );
}

NavButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default NavButton;
