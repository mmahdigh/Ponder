import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { searchPodcastFeed } from '../client';

export const ArweaveContext = createContext();

function ArweaveProvider({ children }) {
  const [podcastsToSync, setPodcastsToSync] = useState([]);
  const [episodesToSync, setEpisodesToSync] = useState([]);

  return (
    <ArweaveContext.Provider
      value={{
        hasItemsToSync: !!(podcastsToSync.length || setPodcastsToSync.length),

        async getPodcastFeed(rssUrl) {
          searchPodcastFeed(rssUrl).then(setEpisodesToSync);
        },

        async sync() {
          if (episodesToSync.length) {

          }
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
