import * as arweave from './arweave';
import * as rss from './rss';

export async function searchPodcastFeed(url) {
  const [rssPodcast, arweavePodcasts] = await Promise.all([
    rss.searchPodcastFeed(url),
    arweave.searchPodcastFeed(url),
  ]);
  console.log(rssPodcast);
  const arweavePodcastUrls = arweavePodcasts.map(podcast => podcast.url);
  const newPodcasts = rssPodcast.episodes
    .filter(podcast => !arweavePodcastUrls.includes(podcast.url));
  console.log(newPodcasts);
  return newPodcasts;
}

export async function addUrl(url) {
  return url;
}
