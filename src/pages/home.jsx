import React, { useContext } from 'react';
import styled from 'styled-components';
import { Table, Container } from 'react-bootstrap';
import { SubscriptionsContext } from '../providers/subscriptions';
import { ToastContext } from '../providers/toast';
// import PodGraph from '../components/pod-graph';
import Cytoscape from '../components/cytoscape';
import SearchPodcasts from '../components/search-podcasts';
import RssButton from '../components/rss-button';
import SyncButton from '../components/sync-button';
import RefreshButton from '../components/refresh-button';

const ArweaveButtons = styled.div`
  position: fixed;
  z-index: 110;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 1em;
  right: 1em;

  button:not(:last-of-type) {
    margin-right: .7em;
  }
`;

function HomePage() {
  const toast = useContext(ToastContext);
  const { subscriptions, subscribe, unsubscribe } = useContext(SubscriptionsContext);

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
      {/* <PodGraph /> */}
      {subscriptions && (
        <Cytoscape subscriptions={subscriptions} />
      )}

      {subscriptions.length ? (
        <Table variant="dark" striped bordered>
          <thead>
            <tr>
              <th>Title</th>
              <th>First Released</th>
              <th>Last Released</th>
              <th aria-label="Row controls" />
            </tr>
          </thead>
          <tbody>
            {subscriptions.map(subscription => (
              <tr key={subscription.subscribeUrl}>
                <th>{subscription.title}</th>
                <td>{subscription.firstPublishedAt.toLocaleString()}</td>
                <td>{subscription.lastPublishedAt.toLocaleString()}</td>
                <td>
                  <RssButton
                    aria-label="Unsubscribe"
                    removeButton
                    onClick={() => unsubscribe(subscription.subscribeUrl)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>There are no podcasts to display&hellip;</p>
      )}

      <ArweaveButtons>
        <SyncButton />
        <RefreshButton />
      </ArweaveButtons>
    </Container>
  );
}

export default HomePage;
