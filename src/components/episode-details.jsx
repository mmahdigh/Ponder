import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Image } from 'react-bootstrap';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { MdMoreTime, MdOutlineCloudUpload } from 'react-icons/md';

const EpisodeLink = styled.a`
    color: #9c8f94;
    padding: 0;
    margin-bottom: 0.25rem;
    display: block;
    text-decoration: none;
    &:hover,
    &:focus {
        color: palevioletred;
    }
    &:active {
        color: red;
    }
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

const CardBody = styled.div`
    padding: 0.5rem 1.25rem;
    display: flex;
    min-height: 1px;
`;
const EpisodeImage = styled.div`
    display: inline-block;
    position: relative;
    line-height: 0;
    margin-right: 1rem;
`;
const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;

`;
// styling the episode image
const EpisodeImageStyle = styled(Image)`
    height: 3.125rem;
    min-height: 3.125rem;
    width: 3.125rem;
    min-width: 3.125rem;
    border-radius: 50%;
`;
const TimeBadge = styled.small`
    display: flex;
    align-items: center;
    line-height: 1;
    font-size: xx-small;
    color: #9c8f94;
`;
const TimeIcon = styled(MdMoreTime)`
    font-size: 12px;
    margin: 2px;
`;
const CalenderIcon = styled(MdOutlineCloudUpload)`
    font-size: 12px;
    margin: 3px;
`;
const PodcastDetails = styled.div`
    display: flex;
    align-items: end;
    line-height: 1;
    font-size: xx-small;
    color: #9c8f94;
    margin-top: 1px;
`;
dayjs.extend(relativeTime);
function EpisodeDetails({
  title, url, publishedAt, imageUrl,
}) {
  return (
    <EpisodeLink href={url}>
      <DetailsCard>
        <CardBody>
          <EpisodeImage>
            <EpisodeImageStyle src={imageUrl} alt={title} fluid />
          </EpisodeImage>
          <Content>
            <h5>{title}</h5>
            <PodcastDetails>

              <TimeBadge>
                <TimeIcon />
                1hr 30min
              </TimeBadge>
              <TimeBadge>
                <CalenderIcon />
                {dayjs(publishedAt).fromNow()}
              </TimeBadge>
            </PodcastDetails>
          </Content>
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
  publishedAt: null,
  imageUrl: null,
  categories: [],
  keywords: [],
};

export default EpisodeDetails;
