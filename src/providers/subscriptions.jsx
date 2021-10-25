import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { searchPodcastFeed } from '../client/rss';
import formatPodcast from '../formatters/podcast';

export const SubscriptionsContext = createContext();

function readCachedPodcasts() {
  const podcasts = JSON.parse(localStorage.getItem('podcasts')) || [];
  return podcasts.map(formatPodcast);
}

function SubscriptionsProvider({ children }) {
  const [subscriptions, setSubscriptions] = useState(readCachedPodcasts());

  async function subscribe(rssUrl) {
    if (subscriptions.some(subscription => subscription.subscribeUrl === rssUrl)) {
      throw new Error('Already subscribed');
    }
    const newPodcast = await searchPodcastFeed(rssUrl);
    setSubscriptions(prev => prev.concat(newPodcast));
    localStorage.setItem('podcasts', JSON.stringify(readCachedPodcasts().concat(newPodcast)));
  }

  return (
    <SubscriptionsContext.Provider
      value={{
        subscribe,
        subscriptions: subscriptions
          .map(subscription => ({
            ...subscription,
            episodes: subscription.episodes
              .map(episode => ({
                ...episode,
                publishedAt: episode.publishedAt && new Date(episode.publishedAt),
              }))
              .sort((a, b) => b.publishedAt - a.publishedAt),
          }))
          .map(subscription => ({
            ...subscription,
            firstPublishedAt: subscription.episodes.at(0).publishedAt,
            lastPublishedAt: subscription.episodes.at(-1).publishedAt,
          })),
      }}
    >
      {children}
    </SubscriptionsContext.Provider>
  );
}

SubscriptionsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SubscriptionsProvider;
