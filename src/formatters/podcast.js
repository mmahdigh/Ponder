function mergeItunesData(items, itunes) {
  return (items || []).concat(itunes || [])
    .filter((a, i, xs) => xs.indexOf(a) === i);
}

export default function formatPodcast(podcast) {
  return {
    title: podcast.title,
    subscribeUrl: podcast.subscribeUrl,
    rssUrl: podcast.feedUrl,
    description: podcast.description || podcast.itunes?.summary,
    imageUrl: podcast.image?.url || podcast.itunes?.image,
    imageTitle: podcast.image?.title,
    language: podcast.language,
    categories: mergeItunesData(podcast.categories, podcast.itunes?.categories),
    keywords: mergeItunesData(podcast.keywords, podcast.itunes?.keywords),
    episodes: podcast.episodes.map(episode => ({
      title: episode.title,
      url: episode.enclosure?.url || episode.link,
      publishedAt: episode.publishedAt,
      imageUrl: episode.image?.url || episode?.itunes?.image,
      categories: mergeItunesData(episode.categories, episode?.itunes?.categories),
      keywords: mergeItunesData(episode.keywords, episode?.itunes?.keywords),
    })),
  };
}
