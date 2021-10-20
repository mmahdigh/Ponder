import RssParser from 'rss-parser/dist/rss-parser.min';

function mergeItunesData(items, itunes) {
  return (items || []).concat(itunes || [])
    .filter((a, i, xs) => xs.indexOf(a) === i);
}

const rssParser = new RssParser();

export async function searchPodcastFeed(url) {
  // rssParser.parseURL(url).then(console.log);
  // return rssParser.parseURL(url).then(res => (res.podcasts || []).map(podcast => ({
  //   ...podcast,
  //   url,
  //   description: podcast.description || podcast.itunes?.summary,
  //   image: podcast.image?.url,
  //   categories: mergeItunesData(podcast.categories, podcast.itunes?.categories),
  //   keywords: mergeItunesData(podcast.keywords, podcast.itunes?.categories),
  //   episodes: podcast.episodes.map(episode => ({
  //     ...episode,
  //     published: new Date(episode.published),
  //     categories: mergeItunesData(episode.categories, episode.itunes?.categories),
  //     keywords: mergeItunesData(episode.keywords, episode.itunes?.keywords),
  //   })),
  // })));

  const feed = await rssParser.parseURL(url);
  return {
    title: feed.title,
    rssUrl: feed.feedUrl,
    description: feed.description || feed.itunes?.summary,
    imageUrl: feed.image?.url || feed.itunes?.image,
    imageTitle: feed.image?.title,
    language: feed.language,
    categories: mergeItunesData(feed.categories, feed.itunes?.categories),
    keywords: mergeItunesData(feed.keywords, feed.itunes?.keywords),
    episodes: feed.items.map(episode => ({
      title: episode.title,
      url: episode.enclosure?.url || episode.link,
      publishedAt: episode.isoDate && new Date(episode.isoDate),
      imageUrl: episode.image?.url || episode.itunes?.image,
      categories: mergeItunesData(episode.categories, episode.itunes?.categories),
      keywords: mergeItunesData(episode.keywords, episode.itunes?.keywords),
    })),
  };
}
