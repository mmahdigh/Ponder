import * as arweave from './arweave-client';
import * as rss from './rss-client';

export async function getNewPodcasts(url) {
  const [rssPodcasts, arweavePodcasts] = await Promise.all([
    rss.getPodcasts(url),
    arweave.getPodcasts(url),
  ]);
  const arweavePodcastUrls = arweavePodcasts.map(podcast => podcast.url);
  const newPodcasts = rssPodcasts.filter(podcast => !arweavePodcastUrls.includes(podcast.url));
}
