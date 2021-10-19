import Arweave from 'arweave';
import getPodcastFeed from './get-podcast-feed';
import key from './key.json';

export const client = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http',
  timeout: 20000,
  logging: true,
});

export async function gqlRequest(payload) {
  return client.api.post('/graphql', payload);
}

export async function loadMetadataBatch(trxId, podcastTags) {
  const episodes = await client.transactions.getData(trxId, {
    decode: true,
    string: true,
  })
    .then(JSON.parse)
    .then(xs => xs.map(a => ({
      ...a,
      url: new URL(a.url),
      published: new Date(a.published),
    })));

  return {
    episodes,
    podcastId: podcastTags['Podner-id'],
    categories: podcastTags['Podner-category'],
    keywords: podcastTags['Podner-keyword'],
    description: podcastTags['Podner-description'],
    rss2Feed: podcastTags['Podner-rss2-feed'],
    title: podcastTags['Podner-title'],
  };
}

export async function subscribeToPodcast(rssUrl) {
  Promise.all([getPodcastFeed(rssUrl), loadMetadataBatch(rssUrl)])
    .then(([podcasts, metadata]) => podcasts);
}

export async function sendTransaction(data, fn) {
  const trx = await client.createTransaction({ data: JSON.stringify(data) }, key);
  trx.addTag('Content-Type', 'application/json');
  trx.addTag('Unix-Time', Math.floor(Date.now() / 1000));
  trx.addTag('Ponder-version', 'v0.02-pre-pre-alpha');
  fn(trx);
  await client.transactions.sign(trx, key);
  const res = await client.transactions.post(trx);
  return {
    ...res,
    id: trx.id,
  };
}
