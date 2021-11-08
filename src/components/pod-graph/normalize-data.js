/* eslint-disable max-len */
import getCustomStuff from './data';

export default function normalizeData() {
  const {
    podcasts: customNodes, episodes: customEpisodes, edges: customEdges, subscriptions: userSubscriptions,
  } = getCustomStuff();
  const loggedUser = 'user2';

  // function to get my logged user subscriptions
  function userPodcasts(users) {
    return users.name === loggedUser;
  }

  const { pods } = userSubscriptions.find(userPodcasts);

  function customPodcastBg(id) {
    return (pods.find(({ podcastID }) => (podcastID === id))) ? 'green' : 'grey';
  }
  // TODO customize the edges styling to users subscription
  function customEdgesStyle(toID) {
    function checkSubscription(pod) {
      return ((pod.podcastID === toID) ? 'dashed' : 'solid');
    }
    return pods.map(checkSubscription);
  }

  // function to check episodes for a single podcast
  const epis = customEpisodes.map(e => e);
  console.log('LONG epis', epis);

  const cytoscapeNodes = customNodes.map(
    ({
      nodeID, title, categories, type, bgImg, description,
    }) => ({
      data: {
        id: nodeID,
        label: title,
        categories: categories.join(',\n'),
        type,
        bgImg,
        description,
        NodesBg: customPodcastBg(nodeID),
        // episodes:customEpisodes.find(e => a=== nodeID);
      },
    }),
  );

  const cytoscapeEdges = customEdges.map(({ fromID, toID }) => ({
    data: {
      source: fromID,
      target: toID,
      label: cytoscapeNodes.find(a => a.data.id === fromID).data.categories,
      EdgeStyle: customEdgesStyle(toID),
      // EdgeStyle: 'dashed',
    },
  }));

  // const cytoscapeElements = ;
  return { nodes: cytoscapeNodes, edges: cytoscapeEdges };
}
