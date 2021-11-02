import React from 'react';
import PropTypes from 'prop-types';

function EpisodeDetails() {
  return <div />;
}

EpisodeDetails.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  publishedAt: PropTypes.instanceOf(Date),
  imageUrl: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string),
  keywords: PropTypes.arrayOf(PropTypes.string),
};

EpisodeDetails.defaultProps = {
  publishedAt: null,
  imageUrl: null,
  categories: [],
  keywords: [],
};

export default EpisodeDetails;
