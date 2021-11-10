import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal, Button, Image } from 'react-bootstrap';
import EpisodeDetails from './episode-details';

const EpisodeList = styled.ol`
  list-style: none;
  display: flex;
  flex-direction: column;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
`;

function PodcastDetails({
  isOpen,
  close,
  title,
  description,
  imageUrl,
  imageTitle,
  id,
  language,
  categories,
  keywords,
  episodes,
}) {
  return (
    <Modal show={isOpen} onHide={close} animation centered scrollable>
      <Modal.Header closeButton>{title}</Modal.Header>
      <Modal.Body>
        {description && (
          <p>{description}</p>
        )}
        {imageUrl && (
          <Image src={imageUrl} alt={imageTitle} fluid />
        )}

        <EpisodeList>
          {/* TODO: <EpisodeDetails {...episode} /> */}
          {episodes.map(episode => (
            <li key={episode.title}>

              <a href={episode.url}>{episode.title}</a>
            </li>
          ))}
        </EpisodeList>
        {console.log('PASSED PROPS IN SELECTED POD>>>>', episodes)}
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" variant="warning" onClick={close}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

PodcastDetails.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  imageTitle: PropTypes.string,
  language: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string),
  keywords: PropTypes.arrayOf(PropTypes.string),
  episodes: PropTypes.arrayOf(EpisodeDetails.propTypes),
};

PodcastDetails.defaultProps = {
  isOpen: false,
  description: null,
  imageUrl: null,
  imageTitle: null,
  language: null,
  categories: [],
  keywords: [],
  episodes: [],
};

export default PodcastDetails;
