import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function SubscribeToPodcast() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // await subscribeToPodcast(e.target.rssUrl);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="rssUrl">
        <Form.Control
          name="rssUrl"
          disabled={isSubmitting}
          placeholder="Subscribe to RSS Feed URL"
        />
      </Form.Group>
      <Button type="submit" variant="info" disabled={isSubmitting}>
        Submit
      </Button>
    </Form>
  );
}

export default SubscribeToPodcast;
