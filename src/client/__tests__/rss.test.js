import { getPodcastFeed } from '../rss';

const TEST_URL = 'https://feeds.simplecast.com/dHoohVNH';

test('getPodcastFeed', async () => {
  const res = await getPodcastFeed(TEST_URL);
  expect(res).toBe(true);
});
