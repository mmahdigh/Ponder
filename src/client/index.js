import * as arweave from './arweave';
import * as rss from './rss';

export async function getNewPodcasts(url) {
  const [rssPodcasts, arweavePodcasts] = await Promise.all([
    rss.getPodcasts(url),
    arweave.getPodcasts(url),
  ]);
  const arweavePodcastUrls = arweavePodcasts.map(podcast => podcast.url);
  const newPodcasts = rssPodcasts.filter(podcast => !arweavePodcastUrls.includes(podcast.url));
  return newPodcasts;
}

export async function addUrl(url) {
  return url;
}
