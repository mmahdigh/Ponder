import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContext } from './toast';
import { getNewEpisodes, createPodcast } from '../client';
import { SubscriptionsContext } from './subscriptions';

export const ArweaveSyncContext = createContext();

function ArweaveSyncProvider({ children }) {
  const toast = useContext(ToastContext);
  const { subscriptions } = useContext(SubscriptionsContext);
  const [isSyncing, setIsSyncing] = useState(false);

  async function sync() {
    setIsSyncing(true);
    try {
      const newEpisodes = await getNewEpisodes(subscriptions);
      await Promise.all(subscriptions.map(createPodcast));
      toast('Sync Complete', { variant: 'success' });
    } catch (ex) {
      console.error(ex);
      toast('Failed to sync to Arweave.', { variant: 'danger' });
    } finally {
      setIsSyncing(true);
    }
  }

  return (
    <ArweaveSyncContext.Provider
      value={{
        isSyncing,
        sync,
      }}
    >
      {children}
    </ArweaveSyncContext.Provider>
  );
}

ArweaveSyncProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ArweaveSyncProvider;
