import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ArweaveSyncContext = createContext();

function ArweaveSyncProvider({ children }) {
  const [isSyncing, setIsSyncing] = useState(false);

  async function sync() {
    const cachedSubscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
    return '';
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
