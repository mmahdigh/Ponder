import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import createPodcastMetadata from './create-podcast-metadata';
import createFeed from './get-podcast-feed';
import getNewestPodcastMetadata from './get-newest-podcast-metadata';

export const ArweaveContext = createContext();

function ArweaveProvider({ children }) {
  const [podcastFeed, setPodcastFeed] = useState([]);
  const [metadata, setMetadata] = useState([]);

  return (
    <ArweaveContext.Provider
      value={{
        podcastFeed,
        metadata,
        createPodcastMetadata,
        getPostcastFeed: createFeed(setPodcastFeed),
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
