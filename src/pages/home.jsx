import React, { useContext } from 'react';
import { Container, Table } from 'react-bootstrap';
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
        <Table striped bordered>
          <thead>
            <tr>
              <th>Title</th>
              <th>Last Released On</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map(subscription => (
              <tr key={subscription.subscribeUrl}>
                <th>{subscription.title}</th>
                <td>
                  {subscription.episodes.at(-1)?.publishedAt?.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>There are no podcasts to display&hellip;</p>
      )}
      <CreatePodcastButton />
    </Container>
  );
}

export default HomePage;
