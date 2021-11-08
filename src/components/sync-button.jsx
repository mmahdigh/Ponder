import React, { useContext, useState } from 'react';
import { FaBacon } from 'react-icons/fa';
import SpinButton from './spin-button';
import { SubscriptionsContext } from '../providers/subscriptions';

function SyncButton() {
  const [isSyncing, setIsSyncing] = useState(false);
  const { subscriptions } = useContext(SubscriptionsContext);

  async function sync() {
    setIsSyncing(true);
    console.log(subscriptions);
  }

  return (
    <SpinButton disabled={isSyncing} onClick={sync}>
      <FaBacon />
    </SpinButton>
  );
}

export default SyncButton;
