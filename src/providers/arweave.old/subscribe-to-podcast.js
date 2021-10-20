import getNewestPodcastMetadata from './get-newest-podcast-metadata';
import getPodcastFeed from './get-podcast-feed';

export default async function subscribeToPodcast(url) {
  const diffPodcasts = await Promise.all([
    getNewestPodcastMetadata(url).then(metadata => metadata.tags
      .find(tag => tag.name === 'Podner-rss2-published-date')),
    getPodcastFeed(url),
  ])
    .then(([metadata, podcasts]) => podcasts.flatMap(podcast => podcast.episodes
      .filter(episode => metadata)));
}
