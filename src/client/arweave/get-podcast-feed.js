import gql from 'fake-tag';
import client from './client';
import { toTag, fromTag } from './utils';

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
      tags: [
        {
          name: toTag('subscribeUrl'),
          values: subscribeUrls,
        },
      ],
    },
  })
    .then(res => res.data.data.transactions.edges.map(edge => edge.node));

  return Promise.all(transactions.map(transaction => client.transactions.getData(transaction.id, {
    decode: true,
    string: true,
  })
    .then(JSON.parse)
    .then(podcast => ({
      ...podcast,
      ...transaction.tags
        .map(tag => ({
          ...tag,
          name: fromTag(tag.name),
        }))
        .filter(tag => !['Content-Type', 'Unix-Time', 'version'].includes(tag.name))
        .reduce((acc, tag) => ({
          ...acc,
          [tag.name]: Array.isArray(acc[tag.name]) ? acc[tag.name].concat(tag.value) : tag.value,
        }), {
          categories: [],
          keywords: [],
        }),
      episodes: podcast.episodes.map(episode => ({
        ...episode,
        publishedAt: new Date(episode.publishedAt),
      })),
    }))));
}
