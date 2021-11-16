import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Badge, Image } from 'react-bootstrap';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { MdMoreTime } from 'react-icons/md';

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
const TimeBadge = styled.small`
    vertical-align: middle;
    line-height: 1;
    color: #fff;

`;
const TimeIcon = styled(MdMoreTime)`
	font-size: 12px;
`;
const CardBody = styled.div`
    padding: 1.5rem 1.25rem;
    display: flex;
    /* justify-content: space-between; */
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
/* border: solid red 1px; */
width: 100%;

`;
// styling the episode image
const episodeImageStyle = {
  height: '3.125rem',
  minHeight: '3.125rem',
  width: '3.125rem',
  minWidth: '3.125rem',
  borderRadius: '50%',
};
dayjs.extend(relativeTime);
function EpisodeDetails({
  title, url, publishedAt, imageUrl,
}) {
  return (
    <EpisodeLink href={url}>
      <DetailsCard>

        <CardBody>
          <EpisodeImage>
            <Image src={imageUrl} alt={title} fluid style={episodeImageStyle} />
          </EpisodeImage>

          <Content>
            <h5> {title}</h5>
            <TimeBadge>
              <TimeIcon /> {dayjs(publishedAt).fromNow()}
            </TimeBadge>
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
  publishedAt: '',
  imageUrl: 'string',
  categories: [],
  keywords: [],
};

export default EpisodeDetails;
