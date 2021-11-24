import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Image } from 'react-bootstrap';
import Logo from '../assets/img/pot.svg';

function LayoutHeader() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Image
            alt=""
            src={Logo}
            width="42"
            height="42"
            className="d-inline-block align-top"
          />{' '}
          {/* Ponder */}
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default LayoutHeader;
