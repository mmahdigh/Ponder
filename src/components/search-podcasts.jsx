import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { InputGroup, Form } from 'react-bootstrap';
import { ToastContext } from '../providers/toast';
import RssButton from './rss-button';

const SearchButton = styled(InputGroup.Text)`
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
  padding-left: .2em;

  button {
    margin: 0;
    border: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

function SearchPodcasts({ onSubmit }) {
  const toast = useContext(ToastContext);
  const [isSearching, setIsSearching] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const query = fd.get('query');
    if (query) {
      setIsSearching(true);
      try {
        await onSubmit({ query });
        event.target.reset();
      } catch (ex) {
        console.error(ex);
        toast('Could not find podcast.', { variant: 'danger' });
      } finally {
        setIsSearching(false);
        // here we refresh the cytoscape graph
        
      }

      //

    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="query">
        <InputGroup>
          <Form.Control
            name="query"
            disabled={isSearching}
            placeholder="https://feeds.simplecast.com/dHoohVNH"
          />
          <SearchButton>
            <RssButton disabled={isSearching} />
          </SearchButton>
        </InputGroup>
      </Form.Group>
    </Form>
  );
}

SearchPodcasts.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchPodcasts;
