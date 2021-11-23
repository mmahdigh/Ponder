import parser from '../parser';
import { getPodcastFeed } from '..';

jest.mock('../parser');

const TEST_URL = 'https://thejimmydoreshow.libsyn.com/rss';

const BASE_MOCK_RESPONSE = {
  title: 'Dowel and Clamp Super Sunday',
  items: [],
};

describe('getPodcastFeed', () => {
  function createRequest(fn) {
    return () => expect(getPodcastFeed(TEST_URL).then(fn));
  }

  describe('description', () => {
    const request = createRequest(({ description }) => description);

    test('Null if provided with no value', async () => {
      parser.parseURL.mockResolvedValue(BASE_MOCK_RESPONSE);
      await request().resolves.toBeNull();
    });

    test('Uses itunes summary if description isn\'t available', async () => {
      parser.parseURL.mockResolvedValue({
        ...BASE_MOCK_RESPONSE,
        itunes: { summary: 'Dowel me timbers' },
      });
      await request().resolves.toBe('Dowel me timbers');
    });

    test('Favours description over itunes summary', async () => {
      parser.parseURL.mockResolvedValue({
        ...BASE_MOCK_RESPONSE,
        description: 'A clamping good time',
        itunes: { summary: 'Dowel me timbers' },
      });
      await request().resolves.toBe('A clamping good time');
    });
  });

  describe('imageUrl', () => {
    const request = createRequest(({ imageUrl }) => imageUrl);

    test('Null if provided with no value', async () => {
      parser.parseURL.mockResolvedValue(BASE_MOCK_RESPONSE);
      await request().resolves.toBeNull();
    });

    test('Uses itunes image if image url isn\'t available', async () => {
      parser.parseURL.mockResolvedValue({
        ...BASE_MOCK_RESPONSE,
        itunes: { image: 'https://nudecelebsforfree.net/steve-buscemi' },
      });
      await request().resolves.toBe('https://nudecelebsforfree.net/steve-buscemi');
    });

    test('Favours description over itunes summary', async () => {
      parser.parseURL.mockResolvedValue({
        ...BASE_MOCK_RESPONSE,
        itunes: {
          ...BASE_MOCK_RESPONSE.itunes,
          image: 'https://nudecelebsforfree.net/steve-buscemi',
        },
        image: {
          ...BASE_MOCK_RESPONSE.image,
          url: 'https://nudecelebsforfree.net/christopher-walken',
        },
      });
      await request().resolves.toBe('https://nudecelebsforfree.net/christopher-walken');
    });
  });

  test('imageUrl', async () => {
    const request = createRequest(({ imageUrl }) => imageUrl);

    parser.parseURL.mockResolvedValue(BASE_MOCK_RESPONSE);
    await request().resolves.toBeNull();

    parser.parseURL.mockResolvedValue({
      ...BASE_MOCK_RESPONSE,
      itunes: { image: 'https://nudecelebsforfree.net/steve-buscemi' },
    });
    await request().resolves.toBe('https://nudecelebsforfree.net/steve-buscemi');

    parser.parseURL.mockResolvedValue({
      ...BASE_MOCK_RESPONSE,
      itunes: {
        ...BASE_MOCK_RESPONSE.itunes,
        image: 'https://nudecelebsforfree.net/steve-buscemi',
      },
      image: {
        ...BASE_MOCK_RESPONSE.image,
        url: 'https://nudecelebsforfree.net/christopher-walken',
      },
    });
    await request().resolves.toBe('https://nudecelebsforfree.net/christopher-walken');
  });

  describe('imageTitle', () => {
    const request = createRequest(({ imageTitle }) => imageTitle);

    test('Null if not defined', async () => {
      parser.parseURL.mockResolvedValue(BASE_MOCK_RESPONSE);
      await request().resolves.toBeNull();
    });

    test('Uses image title for value', async () => {
      parser.parseURL.mockResolvedValue({
        ...BASE_MOCK_RESPONSE,
        image: {
          ...BASE_MOCK_RESPONSE.image,
          title: 'A nude and beatiful Steve Buscemi',
        },
      });
      await request().resolves.toBe('A nude and beatiful Steve Buscemi');
    });
  });

  describe('language', () => {
    const request = createRequest(({ language }) => language);

    test('Null if not defined', async () => {
      parser.parseURL.mockResolvedValue(BASE_MOCK_RESPONSE);
      await request().resolves.toBeNull();
    });

    test('Uses language for value', async () => {
      parser.parseURL.mockResolvedValue({
        ...BASE_MOCK_RESPONSE,
        language: 'Newfoundlandish',
      });
      await request().resolves.toBe('Newfoundlandish');
    });
  });

  describe('categories', () => {
    const request = createRequest(({ categories }) => categories);

    test('Empty array if not defined', async () => {
      parser.parseURL.mockResolvedValue(BASE_MOCK_RESPONSE);
      await request().resolves.toEqual([]);
    });

    test('Merges values from categories and itunes categories', async () => {
      parser.parseURL.mockResolvedValue({
        ...BASE_MOCK_RESPONSE,
        categories: ['free', 'celebs', 'nudity'],
        itunes: {
          ...BASE_MOCK_RESPONSE.itunes,
          categories: ['ramranch', 'unearthly'],
        },
      });
      await request().resolves.toEqual(['free', 'celebs', 'nudity', 'ramranch', 'unearthly']);
    });
  });

  describe('keywords', () => {
    const request = createRequest(({ keywords }) => keywords);

    test('Empty array if not defined', async () => {
      parser.parseURL.mockResolvedValue(BASE_MOCK_RESPONSE);
      await request().resolves.toEqual([]);
    });

    test('Merges values from categories and itunes categories', async () => {
      parser.parseURL.mockResolvedValue({
        ...BASE_MOCK_RESPONSE,
        keywords: ['free', 'celebs', 'nudity'],
        itunes: {
          ...BASE_MOCK_RESPONSE.itunes,
          keywords: ['ramranch', 'unearthly'],
        },
      });
      await request().resolves.toEqual(['free', 'celebs', 'nudity', 'ramranch', 'unearthly']);
    });
  });

  describe('episodes', () => {
    const BASE_EPISODE_RESPONSE = {
      title: 'Mr. Bean vs. Mike Tyson',
    };

    test('If not provided is an empty array', async () => {
      parser.parseURL.mockResolvedValue(BASE_MOCK_RESPONSE);
      await expect(getPodcastFeed(TEST_URL).then(({ episodes }) => episodes))
        .resolves.toEqual([]);
    });

    test('title', async () => {
      parser.parseURL.mockResolvedValue({
        ...BASE_MOCK_RESPONSE,
        items: [BASE_EPISODE_RESPONSE],
      });
      await expect(getPodcastFeed(TEST_URL).then(({ episodes }) => episodes[0].title))
        .resolves.toBe('Mr. Bean vs. Mike Tyson');
    });

    test('url', async () => {
      parser.parseURL.mockResolvedValue({
        ...BASE_MOCK_RESPONSE,
        items: [BASE_EPISODE_RESPONSE],
      });
      await expect(getPodcastFeed(TEST_URL).then(({ episodes }) => episodes[0].url))
        .resolves.toBeNull();

      parser.parseURL.mockResolvedValue({
        ...BASE_MOCK_RESPONSE,
        items: [{
          ...BASE_EPISODE_RESPONSE,
          link: 'https://cameronsworld.net/',
        }],
      });
      await expect(getPodcastFeed(TEST_URL).then(({ episodes }) => episodes[0].url))
        .resolves.toBe('https://cameronsworld.net/');
    });

    test('publishedAt', async () => {
      parser.parseURL.mockResolvedValue({
        ...BASE_MOCK_RESPONSE,
        items: [BASE_EPISODE_RESPONSE],
      });
      await expect(getPodcastFeed(TEST_URL).then(({ episodes }) => episodes[0].publishedAt))
        .resolves.toBeNull();

      parser.parseURL.mockResolvedValue({
        ...BASE_MOCK_RESPONSE,
        items: [{
          ...BASE_EPISODE_RESPONSE,
          pubDate: new Date('1991-09-05'),
        }],
      });
      await expect(getPodcastFeed(TEST_URL).then(({ episodes }) => episodes[0].publishedAt))
        .resolves.toEqual(new Date('1991-09-05'));

      parser.parseURL.mockResolvedValue({
        ...BASE_MOCK_RESPONSE,
        items: [{
          ...BASE_EPISODE_RESPONSE,
          isoDate: new Date('1995-02-12'),
        }],
      });
      await expect(getPodcastFeed(TEST_URL).then(({ episodes }) => episodes[0].publishedAt))
        .resolves.toEqual(new Date('1995-02-12'));

      parser.parseURL.mockResolvedValue({
        ...BASE_MOCK_RESPONSE,
        items: [{
          ...BASE_EPISODE_RESPONSE,
          pubDate: new Date('1991-09-05'),
          isoDate: new Date('1995-02-12'),
        }],
      });
      await expect(getPodcastFeed(TEST_URL).then(({ episodes }) => episodes[0].publishedAt))
        .resolves.toEqual(new Date('1995-02-12'));
    });

    test('imageUrl', async () => {
      parser.parseURL.mockResolvedValue({
        ...BASE_MOCK_RESPONSE,
        items: [BASE_EPISODE_RESPONSE],
      });
      await expect(getPodcastFeed(TEST_URL).then(({ episodes }) => episodes[0].imageUrl))
        .resolves.toBeNull();
    });

    test('categories', async () => {
      parser.parseURL.mockResolvedValue({
        ...BASE_MOCK_RESPONSE,
        items: [BASE_EPISODE_RESPONSE],
      });
      await expect(getPodcastFeed(TEST_URL).then(({ episodes }) => episodes[0].categories))
        .resolves.toEqual([]);

      parser.parseURL.mockResolvedValue({
        ...BASE_MOCK_RESPONSE,
        items: [{
          ...BASE_EPISODE_RESPONSE,
          categories: ['a', 'b', 'd'],
          itunes: {
            categories: ['b', 'c', 'a'],
          },
        }],
      });
      await expect(getPodcastFeed(TEST_URL).then(({ episodes }) => episodes[0].categories))
        .resolves.toEqual(['a', 'b', 'd', 'c']);
    });

    test('keywords', async () => {
      parser.parseURL.mockResolvedValue({
        ...BASE_MOCK_RESPONSE,
        items: [BASE_EPISODE_RESPONSE],
      });
      await expect(getPodcastFeed(TEST_URL).then(({ episodes }) => episodes[0].keywords))
        .resolves.toEqual([]);

      parser.parseURL.mockResolvedValue({
        ...BASE_MOCK_RESPONSE,
        items: [{
          ...BASE_EPISODE_RESPONSE,
          keywords: ['ay', 'yo', 'guy'],
          itunes: {
            keywords: ['lets', 'juice', 'yo'],
          },
        }],
      });
      await expect(getPodcastFeed(TEST_URL).then(({ episodes }) => episodes[0].keywords))
        .resolves.toEqual(['ay', 'yo', 'guy', 'lets', 'juice']);
    });
  });
});
