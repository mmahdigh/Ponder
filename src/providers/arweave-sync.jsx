import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { createPodcast } from '../client';

export const ArweaveSyncContext = createContext();

function ArweaveSyncProvider({ children }) {
  const [isSyncing, setIsSyncing] = useState(false);

  async function sync() {
    setIsSyncing(true);
    const newPodcasts = await getNewPodcasts();
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
