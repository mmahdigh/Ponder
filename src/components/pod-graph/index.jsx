/* eslint-disable no-underscore-dangle */
import React, {
  useContext, useState, useRef, useEffect,
} from 'react';
import Cytoscape from 'react-cytoscapejs';
import applyCytoscape from './cytoscape';
import { CytoscapeContext } from '../../providers/cytoscape';
import layout from './layout';
import styles from './styles';
import Legend from './legend';
import { SubscriptionsContext } from '../../providers/subscriptions';
import PodcastDetails from '../podcast-details';

function PodGraph() {
  const { setCytoscape } = useContext(CytoscapeContext);
  const { subscriptions } = useContext(SubscriptionsContext);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const myCyref = useRef();
  const edges = subscriptions
    .reduce((acc, podcast, _, xs) => {
      // A match is any other podcast that has one same category or keyword
      const matches = xs.filter(({ categories, keywords }) => (
        podcast.categories.some(category => categories.includes(category))
        || podcast.keywords.some(keyword => keywords.includes(keyword))
      ));

      // If there are no matches there is nothing to add
      if (!matches.length) return acc;

      // Tack dat on
      return acc.concat(matches.map(match => {
        const relations = podcast.categories.filter(category => match.categories.includes(category))
          .concat(podcast.keywords.filter(keyword => match.keywords.includes(keyword)));
        return {
          source: podcast.subscribeUrl,
          target: match.subscribeUrl,
          EdgeStyle: relations.length ? 'solid' : 'dashed', // havent tested yet with a different podcast categories dure to CORS issue...i told matt about it
          label: relations.join(', '),
        };
      }));
    }, [])
    .reduce((acc, edge) => (
      acc.some(a => a.target === edge.source && a.source === edge.target)
        ? acc
        : acc.concat(edge)
    ), [])
    .filter(edge => edge.target !== edge.source)
    .map(data => ({ data }));

  // TODO
  /**
       After initializing the Cytoscape graph, we need to find:
    for each node, find https://js.cytoscape.org/#nodes.connectedEdges
    then log the bounding box around the set of edges with:
    console.log(j.connectedEdges())
    console.log(j.connectedEdges().boundingBox())
    then maybe we can draw a bounding box around the returned (x1, y1, x2, y2) values?
   */
  const nodes = subscriptions.map(podcast => ({
    data: {
      id: podcast.subscribeUrl,
      label: podcast.title,
      categories: podcast.categories,
      bgImg: podcast.imageUrl,
      NodesBg: 'green', // TODO: Make 'grey' if not subscribed podcast
      episodes: podcast.episodes,
      description: podcast.description,
      title: podcast.title,
      imageUrl: podcast.imageUrl,
      imageTitle: podcast.title,
      parent: '',
    },
  }));

  const elements = Cytoscape.normalizeElements({ nodes, edges });

  return (
    <>
      <Cytoscape
        elements={elements}
        layout={layout}
        stylesheet={styles}
        cy={applyCytoscape(setCytoscape, {
          setSelectedPodcast,
        })}
        // ref={myCyref}
        style={{
          minWidth: '100%',
          minHeight: 600,
          backgroundColor: '#202022',
        }}
      />
      <Legend />
      <PodcastDetails
        {...selectedPodcast}
        isOpen={!!selectedPodcast}
        close={() => setSelectedPodcast(null)}
      />
    </>
  );
}

export default PodGraph;
