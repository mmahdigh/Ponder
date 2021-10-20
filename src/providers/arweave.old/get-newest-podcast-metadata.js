import { gqlRequest } from './client';
import NEWEST_PODCAST_METADATA from './newest-podcast-metadata.graphql';

export default async function getNewestPodcastMetadata(rssUrl) {
  async function fetchMetadata(acc = []) {
    const transactions = await gqlRequest({
      query: NEWEST_PODCAST_METADATA,
      variables: {
        tags: [
          {
            name: 'Podner-rss2-feed',
            values: [rssUrl],
          },
          {
            name: 'Podner-first-episode',
            values: [acc.length + 1],
          },
        ],
      },
    })
      .then(res => res.data.data.transactions.edges[0]?.node || []);
    return transactions.length ? fetchMetadata(acc.concat(transactions)) : acc;
  }

  return fetchMetadata().then(podcasts => podcasts.map(podcast => ({
    ...podcast,
    tags: podcast.tags.reduce(
      (acc, tag) => ({
        ...acc,
        [tag.name]: Array.isArray(acc[tag.name])
          ? acc[tag.name].concat(tag.value)
          : tag.value,
      }),
      {
        podnerCategory: [],
        podnerKeywords: [],
      },
    ),
  })));
}
