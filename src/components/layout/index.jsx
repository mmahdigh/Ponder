import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from './header';
import Footer from './footer';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  > main {
    flex-grow: 1;
    padding-top: 1rem;
  }
`;

function Layout({ children }) {
  return (
    <Page>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </Page>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
