import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { ArweaveContext } from '../providers/arweave';
import Loading from '../components/loading';
import CreatePodcastButton from '../components/create-podcast-button';

function HomePage() {
  const { getNewestPodcastMetadata } = useContext(ArweaveContext);
  const [feedMetadata, setFeedMetadata] = useState(null);

  useEffect(() => {
    getNewestPodcastMetadata('https://feeds.simplecast.com/dHoohVNH')
      .then(setFeedMetadata);
  }, []);

  return (
    <Container>
      <h1>Home Page!</h1>
      {!feedMetadata ? (
        <Loading />
      ) : (
        <>
          {feedMetadata.length ? (
            <div />
          ) : (
            <>
              <p>There are no episodes to display&hellip;</p>
            </>
          )}
          <CreatePodcastButton />
        </>
      )}
    </Container>
  );
}

export default HomePage;
