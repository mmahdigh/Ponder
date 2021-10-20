import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import { addUrl } from '../client';

function AddUrlForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rssUrl, setRssUrl] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    const fd = new FormData(e.target);
    return addUrl(fd.get('rssUrl').trim(), fd.get('isPublic'))
      .then(() => {
        setRssUrl('');
        setIsPublic(false);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="rssUrl">
        <Form.Control
          name="rssUrl"
          placeholder="https://example.com/rss"
          disabled={isSubmitting}
          value={rssUrl}
          onChange={e => setRssUrl(e.target.value)}
        />
      </Form.Group>
      <Form.Check name="isPublic" disabled={isSubmitting} checked={isPublic} />
      <Button type="submit" variant="info" disabled={isSubmitting}>
        <FaArrowRight />
      </Button>
    </Form>
  );
}

export default AddUrlForm;
