import RssParser from 'rss-parser/dist/rss-parser.min';
import formatPodcast from '../formatters/podcast';

const rssParser = new RssParser();

export async function searchPodcastFeed(subscribeUrl) {
  const { items, ...podcast } = await rssParser.parseURL(subscribeUrl);
  return formatPodcast({
    ...podcast,
    subscribeUrl,
    episodes: items.map(item => ({
      ...item,
      publishedAt: item.isoDate || item.pubDate,
    })),
  });
}
