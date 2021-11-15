import React, { useContext, useState } from 'react';
import Cytoscape from 'react-cytoscapejs';
import applyCytoscape from './cytoscape';
import { CytoscapeContext } from '../../providers/cytoscape';
import layout from './layout';
import styles from './styles';
import Legend from './legend';
import { SubscriptionsContext } from '../../providers/subscriptions';
import PodcastDetails from '../podcast-details';
// import { isFirstInstance } from '../../utils';

function PodGraph() {
  const { setCytoscape } = useContext(CytoscapeContext);
  const { subscriptions } = useContext(SubscriptionsContext);
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  const nodes = subscriptions.map(podcast => ({
    data: {
      id: podcast.subscribeUrl,
      label: podcast.title,
      categories: podcast.categories.join(',\n'),
      bgImg: podcast.imageUrl,
      NodesBg: 'green', // TODO: Make 'grey' if not subscribed podcast
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
        let EdgeStyle = 'dashed'; // TODO
        return {
          EdgeStyle,
          source: podcast.subscribeUrl,
          target: match.subscribeUrl,
          label: podcast.categories.filter(category => match.categories.includes(category))
            .concat(podcast.keywords.filter(keyword => match.keywords.includes(keyword)))
            // .filter(isFirstInstance)
            .join(', '),
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
      <PodcastDetails isOpen={!!selectedPodcast} close={() => setSelectedPodcast(null)} />
    </>
  );
}

export default PodGraph;
