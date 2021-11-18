import client from './client';
import { toTag } from './utils';
import key from './key.json';
import { unixTimestamp } from '../../utils';

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
