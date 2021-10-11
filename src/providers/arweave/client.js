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
