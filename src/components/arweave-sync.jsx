import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { FaSync } from 'react-icons/fa';
import { SubscriptionsContext } from '../providers/subscriptions';

const SyncButton = styled(Button)`
  position: fixed;
  z-index: 110;
  top: 1em;
  right: 1em;
`;

const SyncOverlay = styled.div`
  position: fixed;
  z-index: ${({ active }) => (active ? -1 : 100)};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: ${({ active }) => (active ? 0.8 : 0)};
  transition: opacity .35s ease-in-out;
`;

function ArweaveSync() {
  const [isSyncing, setIsSyncing] = useState(false);
  const { subscriptions } = useContext(SubscriptionsContext);

  async function sync() {
    setIsSyncing(true);
    console.log(subscriptions);
  }

  return (
    <>
      <SyncOverlay active={isSyncing} />
      <SyncButton disabled={isSyncing} onClick={sync}>
        <FaSync />
      </SyncButton>
    </>
  );
}

export default ArweaveSync;
