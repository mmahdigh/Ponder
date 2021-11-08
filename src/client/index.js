import * as arweave from './arweave';
import * as rss from './rss';

export { createPodcast } from './arweave';

export async function getNewEpisodes(subscribeUrl) {
  const [rssPodcast, arweavePodcasts] = await Promise.all([
    rss.getPodcastFeed(subscribeUrl),
    arweave.getPodcastFeed(subscribeUrl),
  ]);

  // Episodes don't get an ID from RSS feeds so we use the title and date to determine uniqueness
  return rssPodcast.episodes.filter(rssEpisode => arweavePodcasts
    .every(arweaveEpisode => arweaveEpisode.title !== rssEpisode.title
      && arweaveEpisode.publishedAt !== rssEpisode.publishedAt));
}

export async function getAllPodcasts(podcasts) {
  return Promise.all(podcasts.map(podcast => Promise.all([
    arweave.getPodcastFeed(podcast.subscribeUrl),
    rss.getPodcastFeed(podcast.subscribeUrl),
  ])
    .then(([arweaveFeed, rssFeed]) => ({
      ...rssFeed,
      episodes: arweaveFeed.map(feed => feed.episodes.concat(rssFeed.episodes
        .filter(rssEpisode => feed.episodes
          .every(arweaveEpisode => arweaveEpisode.title !== rssEpisode.title
            && arweaveEpisode.publishedAt !== rssEpisode.publishedAt)))),
    }))));
}

export async function getPodcasts(urls) {
  return Promise.all(urls.map(arweave.getPodcastFeed));
}
