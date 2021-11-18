import * as arweave from './arweave';
import * as rss from './rss';
import { episodeId } from '../utils';

export { createPodcast } from './arweave';

async function fetchFeeds(subscribeUrl) {
  const [arweaveFeed, rssFeed] = await Promise.all([
    arweave.getPodcastFeed(subscribeUrl),
    rss.getPodcastFeed(subscribeUrl),
  ]);
  return {
    arweave: arweaveFeed,
    rss: rssFeed,
  };
}

function mergeFeed(subscribeUrl, feed) {
  const existingIds = feed.arweave.episodes.map(episodeId);
  const newEpisodes = feed.rss.episodes
    .filter(episode => !existingIds.includes(episodeId(episode)));

  if (!newEpisodes.length) {
    const podcastsToBeSynced = JSON.parse(localStorage.getItem('podcastsToBeSynced')) || [];
    const newValue = podcastsToBeSynced.map(podcast => (
      subscribeUrl !== podcast.subscribeUrl ? podcast : {
        ...podcast,
        episodes: podcast.episodes
          .concat(newEpisodes)
          .sort((a, b) => b.publishedAt - a.publishedAt),
      }
    ));
    localStorage.setItem('podcastsToBeSynced', JSON.stringify(newValue));
  }

  return {
    ...feed.arweave,
    ...feed.rss,
    episodes: feed.arweave.episodes
      .concat(newEpisodes)
      .sort((a, b) => b.publishedAt - a.publishedAt),
  };
}

export async function getPodcast(subscribeUrl) {
  return mergeFeed(subscribeUrl, await fetchFeeds(subscribeUrl));
}

export async function getAllPodcasts(subscriptions) {
  return Promise.all(subscriptions
    .map(subscription => fetchFeeds(subscription.subscribeUrl)
      .then(feed => mergeFeed(subscription.subscribeUrl, feed))));
}
