import { gqlRequest } from './client';
import NEWEST_PODCAST_METADATA from './newest-podcast-metadata.graphql';

export default function getNewestPodcastMetadata(setMetadata) {
  return async (rssUrl, batchIndex = '10001') => {
    async function fetchMetadata(acc = []) {
      return gqlRequest({
        query: NEWEST_PODCAST_METADATA,
        variables: {
          tags: [
            {
              name: 'Podner-rss2-feed',
              values: [rssUrl],
            },
            {
              name: 'Podner-first-episode',
              values: [batchIndex],
            },
          ],
        },
      })
        .then(res => res.data.data.transactions.edges[0]?.node || [])
        .then(podcasts => (podcasts.length ? fetchMetadata(acc.concat(podcasts)) : acc));
    }

    const podcasts = await fetchMetadata();
    const metadata = podcasts.map(podcast => ({
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
    }));

    setMetadata(metadata);
    return metadata;
  };
}
