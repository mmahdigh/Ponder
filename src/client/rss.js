import RssParser from 'rss-parser/dist/rss-parser.min';
import formatPodcast from '../formatters/podcast';

const rssParser = new RssParser();

function mergeItunesData(items, itunes) {
  return (items || []).concat(itunes || [])
    .filter((a, i, xs) => xs.indexOf(a) === i)
    .map(a => a.toLowerCase());
}

export async function getPodcastFeed(subscribeUrl) {
  const { items, ...podcast } = await rssParser.parseURL(subscribeUrl);
  console.log('FROM SEARCHING EPISODES===', items, 'FROM SEARCHING PODKAST===', podcast);
  return formatPodcast({
    id: subscribeUrl,
    description: podcast.description || podcast.itunes?.summary,
    imageUrl: podcast.image?.url || podcast.itunes?.image,
    imageTitle: podcast.image?.title,
    language: podcast.language,
    categories: mergeItunesData(podcast.categories, podcast.itunes?.categories),
    keywords: mergeItunesData(podcast.keywords, podcast.itunes?.keywords),
    episodes: items.map(episode => {
      const publishedAt = episode.isoDate || episode.pubDate || null;
      return {
        title: episode.title,
        url: episode.enclosure?.url || episode.link,
        publishedAt: publishedAt && new Date(publishedAt),
        imageUrl: episode.image?.url || episode.itunes?.image,
        categories: mergeItunesData(episode.categories, episode.itunes?.categories),
        keywords: mergeItunesData(episode.keywords, episode.itunes?.keywords),
      };
    }),
  });
}
