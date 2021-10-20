import Arweave from 'arweave';
import { v4 as uuid } from 'uuid';
import createGetPodcasts from './get-podcasts';
import key from '../../providers/arweave/key.json';

const client = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http',
  timeout: 20000,
  logging: true,
});

export const getPodcasts = createGetPodcasts(client);

async function sendTransaction(contents, tags) {
  const trx = await client.createTransaction(JSON.stringify(contents));
  tags.forEach(([k, v]) => {
    trx.addTag(k, v);
  });
  await client.transactions.sign(trx, key);
  return client.transactions.post(trx);
}

export async function createPodcast({
  keywords,
  rssUrl,
  type,
  ...podcast
}) {
  return sendTransaction(podcast, [
    ['rssUrl', rssUrl],
    ['type', type],
  ].concat(keywords.map(keyword => ['keyword', keyword])));
}
