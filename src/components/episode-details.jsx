import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Badge from 'react-bootstrap/Badge';

const EpisodeLink = styled.a`
 color: #9c8f94;
    padding: 0;
    margin-bottom: 0.25rem;
    display: block;
    text-decoration: none;
    /* border: solid 1px red; */
`;
const DetailsCard = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #181819;
    background-clip: border-box;
    border: 1px solid rgba(47, 42, 48, 0.85);
    border-radius: 0.375rem;

`;
const NewBadge = styled.div`
    top: 1px;
    right: 9px;
    transform: translate(25%, -25%);
    position: absolute;
    z-index: 1;
    vertical-align: middle;
    line-height: 1;
    color: #fff;

    /* background-color: #23476d;
    display: inline-block;
    padding: 0.35em 0.65em;
    font-size: 0.75em; */

`;
const CardBody = styled.div`
    padding: 1.5rem 1.25rem;
    flex: 1 1 auto;
    min-height: 1px;
`;

function EpisodeDetails({ title, url, publishedAt }) {
  return (
    <EpisodeLink href={url}>
      <DetailsCard>
        <NewBadge>
          new
        </NewBadge>
        <CardBody>
          wtf
        </CardBody>
      </DetailsCard>
    </EpisodeLink>
  );
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
  publishedAt: '',
  imageUrl: 'string',
  categories: [],
  keywords: [],
};

export default EpisodeDetails;
