import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import { ToastContext } from '../providers/toast';
import { addUrl } from '../client';

const LowerControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: .8rem;
`;

function AddUrlForm() {
  const toast = useContext(ToastContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rssUrl, setRssUrl] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    const fd = new FormData(e.target);
    return addUrl(fd.get('rssUrl').trim(), fd.get('isPublic'))
      .then(() => {
        toast({
          header: 'Success!',
          text: 'Ayyo it worked!',
        });
        setRssUrl('');
        setIsPublic(false);
      })
      .catch(ex => {
        console.error(ex);
        toast({
          header: 'Failure!',
          text: 'Ayyo it dit not work!',
        });
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
      <LowerControls>
        <Form.Check name="isPublic" disabled={isSubmitting} checked={isPublic}>
          Public
        </Form.Check>
        <Button type="submit" variant="info" disabled={isSubmitting}>
          <FaArrowRight />
        </Button>
      </LowerControls>
    </Form>
  );
}

export default AddUrlForm;
