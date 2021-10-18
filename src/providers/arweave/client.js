import Arweave from 'arweave';
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

async function loadMetadataBatch(trxId, podcastTags) {
  const res = await client.transactions.getData(trxId, {
    decode: true,
    string: true,
  })
    .then(JSON.parse);

  return {
    podcastId: podcastTags['Podner-id'],
    categories: podcastTags['Podner-category'],
    keywords: podcastTags['Podner-keyword'],
    description: podcastTags['Podner-description'],
    rss2Feed:  podcastTags['Podner-rss2-feed'],
    title: podcastTags['Podner-title'],
  };

  podcastId = podcastTags[]
    let podcast_id = null
    let json = null
    try {
      let json = JSON.parse(res)
      console.log(json)
      if (podcastTags) {
        podcast_id = podcastTags['Podner-id']
        window.armetadata.podcasts[podcast_id] = {
          categories:  podcastTags['Podner-category'],
          keywords:    podcastTags['Podner-keyword'],
          description: podcastTags['Podner-description'],
          rss2_feed:   podcastTags['Podner-rss2-feed'],
          title:       podcastTags['Podner-title']
        }
      }
      // Merge present metadata with metadata from json
      window.armetadata.episodes[podcast_id] =
      Object.assign({}, window.armetadata.episodes[podcast_id], json)
    }
    catch (error) {
      let error_msg = `Error loading JSON metadata: ${error}. JSON: ${json}`
      console.warn(error_msg)
      throw error
    }
  }
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
