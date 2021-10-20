import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import { ToastContext } from '../providers/toast';
import { searchPodcastFeed } from '../client';
import Loading from '../components/loading';
import SearchPodcasts from '../components/search-podcasts';
import CreatePodcastButton from '../components/create-podcast-button';

function HomePage() {
  const toast = useContext(ToastContext);
  const [podcasts, setPodcasts] = useState(null);
  console.log(podcasts);

  async function search({ query }) {
    return searchPodcastFeed(query)
      .then(setPodcasts)
      .catch(ex => {
        console.error(ex);
        toast('Could not search for podcasts.', {
          variant: 'danger',
        });
      });
  }

  // useEffect(() => {
  //   searchPodcasts('https://feeds.simplecast.com/dHoohVNH')
  //     .then(setPodcasts)
  //     .catch(ex => {
  //       console.error(ex);
  //       toast('Could not search for podcasts.', {
  //         variant: 'danger',
  //       });
  //     });
  // }, []);

  return (
    <Container>
      <SearchPodcasts onSubmit={search} />
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
