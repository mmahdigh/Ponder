import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import createArweaveClient from './arweave';

export const RequestContext = createContext();

function RequestProvider({ children }) {
  return (
    <RequestContext.Provider
      value={{
        async getPodcastFeed(url) {
          Promise.all([getPodcastFeed(url)]);
        },
      }}
    >
      {children}
    </RequestContext.Provider>
  );
}

RequestProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
