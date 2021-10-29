import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaSync } from 'react-icons/fa';
import { SubscriptionsContext } from '../providers/subscriptions';

function SyncButton() {
  const { syncSubscriptions } = useContext(SubscriptionsContext);
  const [isSyncing, setIsSyncing] = useState(false);

  async function handleClick() {

  }

  return (
    <Button type="button" disabled={isSyncing} onClick={handleClick}>
      <FaSync />
    </Button>
  );
}

export default SyncButton;
