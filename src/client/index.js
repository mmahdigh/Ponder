import * as arweave from './arweave';
import * as rss from './rss';

export { createPodcast } from './arweave';

export async function getNewEpisodes(url) {
  const [rssPodcast, arweavePodcasts] = await Promise.all([
    rss.getPodcastFeed(url),
    arweave.getPodcastFeed(url),
  ]);
  const urls = arweavePodcasts.map(podcast => podcast.url);
  const newEpisodes = rssPodcast.episodes.filter(podcast => !urls.includes(podcast.url));
  return newEpisodes;
}

export async function getPodcasts(urls) {
  return Promise.all(urls.map(arweave.getPodcastFeed));
}
