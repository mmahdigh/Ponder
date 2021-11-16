import gql from 'fake-tag';
import client from './client';
import { toTag } from './utils';

export default async function getPodcastFeed(subscribeUrls) {
  const transactions = await client.api.post('/graphql', {
    query: gql`
      query GetPodcast($tags: [TagFilter!]!) {
        transactions(tags: $tags, first: 100, sort: HEIGHT_DESC) {
          edges {
            node {
              id
              tags {
                name
                value
              }
            }
          }
        }
      }
    `,
    variables: {
      podcastTags: [
        {
          name: toTag('subscribeUrl'),
          values: subscribeUrls,
        },
        {
          name: toTag('podcastSubscribeUrl'),
          values: subscribeUrls,
        },
      ],
    },
  })
    .then(res => res.data.data.podcast.edges.map(edge => edge.node));

  console.log(transactions);

  return transactions;
}
