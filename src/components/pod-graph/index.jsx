import React, { useContext, useState } from 'react';
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
    },
  }));

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
<<<<<<< HEAD
          EdgeStyle: relations.length ? 'solid' : 'dashed', // havent tested yet with a different podcast categories dure to CORS issue...i told matt about it
          label: relations.join(', '),
=======
          label: podcast.categories
            .filter(category => match.categories.includes(category))
            .concat(podcast.keywords.filter(keyword => match.keywords.includes(keyword)))
            .filter((a, i, ys) => ys.indexOf(a) === i) // Remove duplicates
            .join(', '),
>>>>>>> clean up arweave client
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
