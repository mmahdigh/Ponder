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

// styling the Podcast image
const podImageStyle = {
  // height: 18.125 rem ;
  minHeight: '18.125rem',
  minWidth: '29.125rem',
  borderRadius: '1rem',
  marginBottom: '2px',
};
function PodcastDetails({
  isOpen,
  close,
  title,
  description,
  imageUrl,
  imageTitle,
  language,
  categories,
  keywords,
  episodes,
}) {
  return (
    <Modal show={isOpen} onHide={close} animation centered scrollable backdrop="static">
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        {description && (
          <p>{description}</p>
        )}
        {imageUrl && (
          <Image src={imageUrl} alt={imageTitle} fluid style={podImageStyle} />
        )}

        <EpisodeList>
          {episodes.map(episode => (
            <EpisodeDetails key={episode.title} {...episode} />
          ))}
        </EpisodeList>

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
