import getPodcastFeed from '../get-podcast-feed';
import { transactions, api } from '../client';

jest.mock('../client');

function baseGqlResponse() {
  return {
    data: {
      data: {
        transactions: {
          edges: [{
            node: {
              id: 'mockId',
              tags: [
                { name: 'Content-Type', value: 'application/json' },
                { name: 'Unix-Time', value: '1620172800' },
                { name: 'version', value: 'bestVersion' },
                { name: 'subscribeUrl', value: 'https://nudecelebsforfree.net/rss' },
                { name: 'title', value: 'Nude Celebs for Free' },
                { name: 'description', value: 'The best in nude celebs for FREE' },
                { name: 'keyword', value: 'CElebs' },
                { name: 'keyword', value: 'frEe' },
                { name: 'category', value: 'PoLitics' },
                { name: 'category', value: 'CaTs' },
              ]
                .map(tag => ({
                  ...tag,
                  name: `${process.env.TAG_PREFIX}-${tag.name}`,
                })),
            },
          }],
        },
      },
    },
  };
}

const BASE_TRANSACTION_RESPONSE = {
  episodes: [
    {
      imageUrl: 'https://nudecelebsforfree.com/img/steve-hoffman.jpg',
      publishedAt: new Date('2002-06-22'),
    },
    {
      imageUrl: 'https://nudecelebsforfree.com/img/steve-buchemi.bmp',
      publishedAt: new Date('1999-05-05'),
    },
  ],
};

const originalTagPrefix = process.env.TAG_PREFIX;
beforeAll(() => {
  process.env.TAG_PREFIX = 'bestPrefix';
});

afterAll(() => {
  process.env.TAG_PREFIX = originalTagPrefix;
});

test('Successful fetch', async () => {
  api.post.mockResolvedValue(baseGqlResponse());
  transactions.getData.mockResolvedValue(JSON.stringify(BASE_TRANSACTION_RESPONSE));
  expect(transactions.getData).not.toHaveBeenCalled();
  await expect(getPodcastFeed('https://nudecelebsforfree.net/rss')).resolves.toEqual({
    subscribeUrl: 'https://nudecelebsforfree.net/rss',
    title: 'Nude Celebs for Free',
    description: 'The best in nude celebs for FREE',
    categories: ['PoLitics', 'CaTs'],
    keywords: ['CElebs', 'frEe'],
    episodes: [
      {
        imageUrl: 'https://nudecelebsforfree.com/img/steve-hoffman.jpg',
        publishedAt: new Date('2002-06-22'),
      },
      {
        imageUrl: 'https://nudecelebsforfree.com/img/steve-buchemi.bmp',
        publishedAt: new Date('1999-05-05'),
      },
    ],
  });
  expect(transactions.getData).toHaveBeenCalledWith('mockId', {
    decode: true,
    string: true,
  });
});

test('Fails on GraphQL request', async () => {
  const mockError = new Error('GraphQL goofed');
  api.post.mockRejectedValue(mockError);
  transactions.getData.mockResolvedValue(JSON.stringify(BASE_TRANSACTION_RESPONSE));
  await expect(getPodcastFeed('https://nudecelebsforfree.net/rss')).rejects.toBe(mockError);
  expect(api.post).toHaveBeenCalled();
  expect(transactions.getData).not.toHaveBeenCalled();
});

test('Fails on getData request', async () => {
  const mockError = new Error('getData goofed');
  api.post.mockResolvedValue(baseGqlResponse());
  transactions.getData.mockRejectedValue(mockError);
  await expect(getPodcastFeed('https://nudecelebsforfree.net/rss')).rejects.toBe(mockError);
  expect(api.post).toHaveBeenCalled();
  expect(transactions.getData).toHaveBeenCalled();
});
