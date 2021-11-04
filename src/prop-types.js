import PropTypes from 'prop-types';

export const episodePropType = PropTypes.shape({
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  publishedAt: PropTypes.instanceOf(Date),
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
});

export const podcastPropType = PropTypes.shape({
  rssUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  language: PropTypes.string,
  imageUrl: PropTypes.string,
  imageTitle: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  episodes: PropTypes.arrayOf(episodePropType).isRequired,
});
