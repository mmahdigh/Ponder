'use strict';

require('dotenv').config();
const Arweave = require('arweave');
const key = require('./src/client/arweave/key.json');
const seeds = require('./seeds.json');

(async () => {
  const client = Arweave.init({
    host: 'localhost',
    port: 1984,
    protocol: 'http',
    timeout: 20000,
    logging: true,
  });

  console.log('Begin seeding...');
  await Promise.all(seeds.podcasts
    .map(({ contents, tags }) => client.createTransaction({ data: JSON.stringify(contents) }, key)
      .then(trx => {
        trx.addTag('Content-Type', 'application/json');
        trx.addTag('Unix-Time', Math.floor(Date.now() / 1000));
        trx.addTag(`${process.env.TAG_PREFIX}-version`, process.env.VERSION);
        tags.forEach(([k, v]) => {
          trx.addTag(`${process.env.TAG_PREFIX}-${k}`, v);
        });
        return client.transactions.sign(trx, key)
          .then(() => client.transactions.post(trx));
      })));
  console.log('Seeding successful!');
})();
