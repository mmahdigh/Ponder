import Arweave from 'arweave';
import { unixTimestamp } from '../../utils';
import getPodcastQuery from './get-podcast.graphql';
import key from './key.json';

const client = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http',
  timeout: 20000,
  logging: true,
});

function toTag(name) {
  return `${process.env.TAG_PREFIX}-${name}`;
}

function getEpisodeCount(episode) {
  return parseInt(episode.tags.find(tag => tag.name === toTag('count')), 10);
}

export async function getPodcastFeed(subscribeUrl) {
  const transaction = await client.api.post('/graphql', {
    query: getPodcastQuery,
    variables: {
      podcastTags: [
        {
          name: toTag('subscribeUrl'),
          values: [subscribeUrl],
        },
      ],
      episodeTags: [
        {
          name: toTag('podcastSubscribeUrl'),
          values: [subscribeUrl],
        },
      ],
    },
  })
    .then(res => ({
      // Podcasts will still contain the episodes that existed on the RSS feed at the time
      // of this record's creation
      podcast: res.data.data.podcast.edges[0]?.node || [],
      // For all subsequent records we tack them on using these
      episodes: res.data.data.episodes.edges || [],
    }))
    .then(({ podcast, episodes }) => ({
      ...podcast,
      episodes: podcast.episodes.concat(episodes
        .sort((a, b) => getEpisodeCount(a) - getEpisodeCount(b))
        .flat()),
    }));

  if (!transaction) return null;
  const { tags, ...podcast } = transaction;

  function extractTag(name) {
    return tags.filter(tag => tag.name === toTag(name)).map(tag => tag.value);
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
  trx.addTag(toTag('version'), process.env.VERSION);
  tags.forEach(([k, v]) => {
    trx.addTag(toTag(k), v);
  });
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
  ]);
}

export async function createEpisodes(podcastSubscribeUrl, episodes, prevCount = 0) {
  return sendTransaction(episodes, [
    ['podcastSubscribeUrl', podcastSubscribeUrl],
    ['count', prevCount + episodes.length],
  ]);
}
