import Arweave from 'arweave';
import createGetPodcasts from './get-podcasts';

export default function createArweaveClient() {
  const client = Arweave.init({
    host: 'localhost',
    port: 1984,
    protocol: 'http',
    timeout: 20000,
    logging: true,
  });

  return {
    getPodcasts: createGetPodcasts(client),
  };
}
