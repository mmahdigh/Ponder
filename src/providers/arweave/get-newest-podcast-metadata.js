import { gqlRequest } from './client';
import NEWEST_PODCAST_METADATA from './newest-podcast-metadata.graphql';

export default function getNewestPodcastMetadata(setMetadata) {
  return async (rssUrl, batchIndex = '10001') => {
    const podcasts = await gqlRequest({
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
      .then(res => res.data.data.transactions.edges[0]?.node || []);

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
