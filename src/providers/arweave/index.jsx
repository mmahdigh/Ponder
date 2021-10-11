import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import createPodcastMetadata from './create-podcast-metadata';
import getNewestPodcastMetadata from './get-newest-podcast-metadata';

export const ArweaveContext = createContext();

function ArweaveProvider({ children }) {
  const [metadata, setMetadata] = useState([]);

  return (
    <ArweaveContext.Provider
      value={{
        metadata,
        createPodcastMetadata,
        getNewestPodcastMetadata: getNewestPodcastMetadata(setMetadata),
      }}
    >
      {children}
    </ArweaveContext.Provider>
  );
}

ArweaveProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ArweaveProvider;
