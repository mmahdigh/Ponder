import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function CreatePodcastButton() {
  const [isCreating, setIsCreating] = useState(false);

  async function handleClick() {
    setIsCreating(true);
  }

  return (
    <Button variant="info" disabled={isCreating} onClick={handleClick}>
      Create
    </Button>
  );
}

export default CreatePodcastButton;
