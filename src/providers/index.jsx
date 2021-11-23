import React from 'react';
import PropTypes from 'prop-types';
import ToastProvider from './toast';
import SubscriptionsProvider from './subscriptions';
import ArweaveSyncProvider from './arweave-sync';
import CytoscapeProvider from './cytoscape';

function GlobalProviders({ children }) {
  return (
    <ToastProvider>
      <SubscriptionsProvider>
        <ArweaveSyncProvider>
          <CytoscapeProvider>
            {children}
          </CytoscapeProvider>
        </ArweaveSyncProvider>
      </SubscriptionsProvider>
    </ToastProvider>
  );
}

GlobalProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProviders;
