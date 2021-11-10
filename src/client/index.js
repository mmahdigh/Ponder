import * as arweave from './arweave';
import * as rss from './rss';
import { episodeId } from '../utils';

export { createPodcast } from './arweave';

async function fetchFeeds(subscribeUrl) {
  return Promise.all([
    arweave.getPodcastFeed(subscribeUrl),
    rss.getPodcastFeed(subscribeUrl),
  ])
    .then(([arweaveFeed, rssFeed]) => ({
      arweave: arweaveFeed,
      rss: rssFeed,
    }));
}

export async function getPodcast(subscribeUrl) {
  const feeds = await fetchFeeds(subscribeUrl);

  return {
    ...feeds.arweave,
    ...feeds.rss,
    episodes: !feeds.arweave ? feeds.rss.episodes : feeds.arweave.episodes.concat(feeds.rss.episodes
      .filter(rssEpisode => feeds.arweave.episodes
        .every(arweaveEpisode => episodeId(arweaveEpisode) !== episodeId(rssEpisode)))),
  };
}

export async function getAllPodcasts(podcasts) {
  return Promise.all(podcasts.map(podcast => getPodcast(podcast.subscribeUrl)));
}

export async function getNewEpisodes(subscriptions) {
  const feeds = await fetchFeeds(subscriptions);
  const arweaveEpisodeIds = feeds.arweave.flatMap(podcast => podcast.episodes.map(episodeId));

  return feeds.rss
    .map(feed => ({
      subscribeUrl: feed.subscribeUrl,
      episodes: feed.episodes.filter(episode => !arweaveEpisodeIds.includes(episodeId(episode))),
    }))
    .filter(({ episodes }) => episodes.length);
}
