import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ArweaveContext } from '../providers/arweave';

function CreatePodcastButton() {
  const { createPodcastMetadata } = useContext(ArweaveContext);
  const [isCreating, setIsCreating] = useState(false);

  async function handleClick() {
    setIsCreating(true);
    createPodcastMetadata().finally(() => {
      setIsCreating(false);
    });
  }

  return (
    <Button variant="info" disabled={isCreating} onClick={handleClick}>
      Create
    </Button>
  );
}

export default CreatePodcastButton;
