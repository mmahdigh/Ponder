import RssParser from 'rss-parser/dist/rss-parser.min';

function mergeItunesData(items, itunes) {
  return (items || []).concat(itunes || [])
    .filter((a, i, xs) => xs.indexOf(a) === i);
}

const rssParser = new RssParser();

export async function getPodcasts(url) {
  return rssParser.parseURL(url).then(res => res.podcasts.map(podcast => ({
    ...podcast,
    url,
    description: podcast.description || podcast.itunes?.summary,
    image: podcast.image?.url,
    categories: mergeItunesData(podcast.categories, podcast.itunes?.categories),
    keywords: mergeItunesData(podcast.keywords, podcast.itunes?.categories),
    episodes: podcast.episodes.map(episode => ({
      ...episode,
      published: new Date(episode.published),
      categories: mergeItunesData(episode.categories, episode.itunes?.categories),
      keywords: mergeItunesData(episode.keywords, episode.itunes?.keywords),
    })),
  })));
}
