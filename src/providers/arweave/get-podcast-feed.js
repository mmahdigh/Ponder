import RssParser from 'rss-parser';

function mergeItunesData(items, itunes) {
  return (items || []).concat(itunes || [])
    .filter((a, i, xs) => xs.indexOf(a) === i)
    .sort((a, b) => a.localeCompare(b));
}

export default async function getPodcastFeed(url) {
  const rssParser = new RssParser();
  return rssParser.parseURL(url).then(res => res.podcasts
    .map(podcast => ({
      title: podcast.title,
      url: new URL(url),
      description: podcast.description || podcast.itunes?.summary,
      rssFeed: new URL(podcast.feedUrl),
      image: new URL(podcast.image.url),
      categories: mergeItunesData(podcast.categories, podcast.itunes?.categories),
      keywords: mergeItunesData(podcast.keywords, podcast.itunes?.categories),
      episodes: podcast.episodes
        .map(episode => ({
          ...episode,
          url: new URL(episode.url),
          published: new Date(episode.published),
          categories: mergeItunesData(episode.categories, episode.itunes?.categories),
          keywords: mergeItunesData(episode.keywords, episode.itunes?.keywords),
        }))
        .sort((a, b) => a.published - b.published),
    }))
    .sort((a, b) => a.title.localeCompare(b.title)));
}
