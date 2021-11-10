import Arweave from 'arweave';
import gql from 'fake-tag';
import createGetPodcasts from './get-podcasts';
import { unixTimestamp } from '../../utils';
import key from './key.json';

const client = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http',
  timeout: 20000,
  logging: true,
});

// export const getPodcastFeed = createGetPodcasts(client);

export async function getPodcastFeed(subscribeUrl) {
  const [transaction] = await client.api.post('/graphql', {
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
          name: `${process.env.TAG_PREFIX}-subscribeUrl`,
          values: [subscribeUrl],
        },
      ],
    },
  })
    .then(res => res.data.data.transactions.edges[0]?.node || []);

  if (!transaction) return null;
  const { tags, ...podcast } = transaction;

  function extractTag(name) {
    return tags.filter(tag => tag.name === name).map(tag => tag.value);
  }

  return {
    ...podcast,
    categories: extractTag('category'),
    keywords: extractTag('keyword'),
  };
}

async function sendTransaction(contents, tags) {
  const trx = await client.createTransaction({ data: JSON.stringify(contents) }, key);
  trx.addTag('Content-Type', 'application/json');
  trx.addTag('Unix-Time', unixTimestamp());
  trx.addTag(`${process.env.TAG_PREFIX}-version`, process.env.VERSION);
  tags.forEach(([k, v]) => {
    trx.addTag(k, v);
  });
  console.log(tags);
  await client.transactions.sign(trx, key);
  return client.transactions.post(trx);
}

export async function createPodcast({
  keywords,
  categories,
  subscribeUrl,
  ...podcast
}) {
  return sendTransaction(podcast, [
    ['subscribeUrl', subscribeUrl],
    ['title', podcast.title],
    ['description', podcast.description],
    ...categories.map(category => ['category', category]),
    ...keywords.map(keyword => ['keyword', keyword]),
  ]
    .map(([k, v]) => [`${process.env.TAG_PREFIX}-${k}`, v]));
}
