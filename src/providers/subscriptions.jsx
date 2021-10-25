import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { searchPodcastFeed } from '../client/rss';

export const SubscriptionsContext = createContext();

function SubscriptionsProvider({ children }) {
  const [subscriptions, setSubscriptions] = useState([]);

  async function subscribe(rssUrl) {
    if (subscriptions.some(subscription => subscription.subscribeUrl === rssUrl)) {
      throw new Error('Already subscribed');
    }
    const podcast = await searchPodcastFeed(rssUrl);
    setSubscriptions(prev => prev.concat(podcast));
  }

  return (
    <SubscriptionsContext.Provider
      value={{
        subscriptions,
        subscribe,
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
