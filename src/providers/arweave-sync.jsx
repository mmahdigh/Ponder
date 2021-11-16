import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContext } from './toast';
import { createPodcast } from '../client';
import { SubscriptionsContext } from './subscriptions';

export const ArweaveSyncContext = createContext();

function ArweaveSyncProvider({ children }) {
  const toast = useContext(ToastContext);
  const { subscriptions } = useContext(SubscriptionsContext);
  const [isSyncing, setIsSyncing] = useState(false);

  async function sync() {
    // setIsSyncing(true);
    // try {
    //   const podcastsToSync = await getNewEpisodes(subscriptions);
    //   podcastsToSync
    //   await Promise.all(podcastsWithNewEpisodes.map(podcast => createPodcast()));
    //   toast('Sync Complete', { variant: 'success' });
    // } catch (ex) {
    //   console.error(ex);
    //   toast('Failed to sync to Arweave.', { variant: 'danger' });
    // } finally {
    //   setIsSyncing(true);
    // }
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
