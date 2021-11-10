import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import useRerenderEffect from '../hooks/use-rerender-effect';
import { getPodcastFeed } from '../client/rss';

export const SubscriptionsContext = createContext();

function readCachedPodcasts() {
  const podcasts = JSON.parse(localStorage.getItem('subscriptions')) || [];
  console.log('STORAGE SUBSCRIPTIONS', podcasts);
  return podcasts.map(podcast => ({
    ...podcast,
    episodes: podcast.episodes.map(episode => ({
      ...episode,
      publishedAt: episode.publishedAt && new Date(episode.publishedAt),
    })),
  }));
}

function SubscriptionsProvider({ children }) {
  const [subscriptions, setSubscriptions] = useState(readCachedPodcasts());

  async function subscribe(subscribeUrl) {
    if (subscriptions.some(subscription => subscription.subscribeUrl === subscribeUrl)) {
      throw new Error('Already subscribed');
    }
    const newPodcast = await getPodcastFeed(subscribeUrl);
    setSubscriptions(prev => prev.concat(newPodcast));
  }

  async function unsubscribe(subscribeUrl) {
    if (subscriptions.every(subscription => subscription.subscribeUrl !== subscribeUrl)) {
      throw new Error('Not subscribed.');
    }
    setSubscriptions(prev => prev
      .filter(subscription => subscription.subscribeUrl !== subscribeUrl));
  }

  useRerenderEffect(() => {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  return (
    <SubscriptionsContext.Provider
      value={{
        subscribe,
        unsubscribe,
        subscriptions: subscriptions
          .map(subscription => ({
            ...subscription,
            episodes: subscription.episodes
              .map(episode => ({
                ...episode,
                publishedAt: episode.publishedAt && new Date(episode.publishedAt),
              }))
              .sort((a, b) => a.publishedAt - b.publishedAt),
          }))
          .map(subscription => ({
            ...subscription,
            firstPublishedAt: subscription.episodes.at(0).publishedAt,
            lastPublishedAt: subscription.episodes.at(-1).publishedAt,
          }))
          .sort((a, b) => a.title.localeCompare(b.title)),
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
