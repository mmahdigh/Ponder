import gql from 'fake-tag';

export default function createGetPodcasts(client) {
  return async url => {
    async function fetchBatch(acc = []) {
      const transactions = await client.api.post('/graphql', {
        query: gql`
          query GetPodcasts($tags: [TagFilter!]!) {
            transactions(tags: $tags, first: 100, sort: HEIGHT_DESC) {
              edges {
                node {
                  id
                  tags {
                    name
                    value
                  }
                }
              }
            }
          }
        `,
        variables: {
          tags: [
            {
              name: `${process.env.TAG_PREFIX}-subscribeUrl`,
              values: [url],
            },
            {
              name: `${process.env.TAG_PREFIX}-firstEpisode`,
              values: [(acc.length + 1).toString()],
            },
          ],
        },
      })
        .then(res => res.data.data.transactions.edges[0]?.node || []);
      return transactions.length ? fetchBatch(acc.concat(transactions)) : acc;
    }

    const podcasts = await fetchBatch();
    return podcasts
      .map(podcast => ({
        ...podcast,
        tags: podcast.tags.reduce(
          (acc, tag) => ({
            ...acc,
            [tag.name]: Array.isArray(acc[tag.name])
              ? acc[tag.name].concat(tag.value)
              : tag.value,
          }),
          {
            category: [],
            keyword: [],
          },
        ),
      }))
      .map(({ category, keyword, ...podcast }) => ({
        ...podcast,
        categories: category,
        keywords: keyword,
      }));
  };
}
