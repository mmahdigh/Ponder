import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { SubscriptionsContext } from '../providers/subscriptions';
import { ToastContext } from '../providers/toast';
import SearchPodcasts from '../components/search-podcasts';
import CreatePodcastButton from '../components/create-podcast-button';

function HomePage() {
  const toast = useContext(ToastContext);
  const { subscriptions, subscribe } = useContext(SubscriptionsContext);

  async function search({ query }) {
    return subscribe(query).catch(ex => {
      console.error(ex);
      toast('Could not search for podcasts.', {
        variant: 'danger',
      });
    });
  }

  return (
    <Container>
      <SearchPodcasts onSubmit={search} />
      {subscriptions.length ? (
        <p>{subscriptions.length}</p>
      ) : (
        <p>There are no podcasts to display&hellip;</p>
      )}
      <CreatePodcastButton />
    </Container>
  );
}

export default HomePage;
