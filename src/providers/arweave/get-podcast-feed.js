import RssParser from 'rss-parser';

function mergeItunesData(items, itunes) {
  return (items || []).concat(itunes || [])
    .filter((a, i, xs) => xs.indexOf(a) === i)
    .sort((a, b) => a.localeCompare(b));
}

export default function getPodcastFeed(setPodcasts) {
  const rssParser = new RssParser();

  return async url => {
    const feed = await rssParser.parseURL(url);
    setPodcasts(prev => prev.podcasts.concat({
      title: feed.title,
      url: new URL(url),
      description: feed.description || feed.itunes?.summary,
      rssFeed: new URL(feed.feedUrl),
      image: new URL(feed.image.url),
      categories: mergeItunesData(feed.categories, feed.itunes?.categories),
      keywords: mergeItunesData(feed.keywords, feed.itunes?.categories),
      episodes: feed.episodes
        .map(episode => ({
          ...episode,
          url: new URL(episode.url),
          published: new Date(episode.published),
          categories: mergeItunesData(episode.categories, episode.itunes?.categories),
          keywords: mergeItunesData(episode.keywords, episode.itunes?.keywords),
        }))
        .sort((a, b) => a.published - b.published),
    }));
  };
}
