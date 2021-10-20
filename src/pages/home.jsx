import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { getNewPodcasts } from '../client';
import Loading from '../components/loading';
import CreatePodcastButton from '../components/create-podcast-button';

function HomePage() {
  const [podcasts, setPodcasts] = useState(null);

  useEffect(() => {
    getNewPodcasts().then(setPodcasts);
  }, []);

  return (
    <Container>
      <h1>Home Page!</h1>
      {podcasts === null ? (
        <Loading />
      ) : (
        <>
          {podcasts.length ? (
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
