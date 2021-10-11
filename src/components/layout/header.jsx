import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';

function LayoutHeader() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand as={Link} to="/">Ponder</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default LayoutHeader;
