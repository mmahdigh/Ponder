import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import subscribeToPodcast from './subscribe-to-podcast';
import createPodcastMetadata from './create-podcast-metadata';
import getPodcastFeed from './get-podcast-feed';
import getNewestPodcastMetadata from './get-newest-podcast-metadata';
import { loadMetadataBatch } from './client';

export const ArweaveContext = createContext();

function ArweaveProvider({ children }) {
  const [podcastFeed, setPodcastFeed] = useState([]);

  return (
    <ArweaveContext.Provider
      value={{
        podcastFeed,
        metadata,
        createPodcastMetadata,
        getPostcastFeed: createFeed(setPodcastFeed),

        async subscribeToPodcast(rssUrl) {
          Promise.all([getPodcastFeed(rssUrl), loadMetadataBatch(rssUrl)])
            .then(([podcasts, metadata]) => setPodcastFeed(podcasts.map(podcast => ({
              ...podcast,
              ...metadata,
            }))));
        },

        async getNewestPodcastMetadata(...args) {
          const newestMetadata = await getNewestPodcastMetadata(...args);
          setMetadata(prev => prev.concat(newestMetadata));
        },
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
