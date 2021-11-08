/* eslint-disable max-len */
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

  const elements = Cytoscape.normalizeElements({
    nodes: subscriptions.map(({ episodes, ...podcast }) => ({
      data: {
        id: podcast.subscribeUrl,
        label: podcast.title,
        categories: podcast.categories.join(',\n'),
        bgImg: podcast.imageUrl,
        NodesBg: 'green', // TODO: Make 'grey' if not subscribed podcast
      },
    })),
    edges: subscriptions.reduce((acc, podcast, i, xs) => {
      // A match is any other podcast that has one same category or keyword
      const matches = xs.filter(({ categories, keywords }) => categories
        .some(category => podcast.categories.includes(category))
        || keywords.some(keyword => podcast.keywords.includes(keyword)));

      // If there are no matches there is nothing to add
      if (!matches.length) return acc;

      // Remove duplicates
      // matches = matches.filter((match, i, xs) => xs.map(a ));

      // Tack dat on
      return acc.concat(matches.map(match => ({
        source: podcast.subscribeUrl,
        target: match.subscribeUrl,
        label: podcast.categories.filter(category => match.categories.includes(category))
          .concat(podcast.keywords.filter(keyword => match.keywords.includes(keyword)))
          .join(', '),
        isMatch: true, // There will be three different edge styles
      })));
    }, []),
  });

  const { label: title, bgImg: imageUrl, description } = selectedPodcast;

  function toggleModal() {
    setIsDetailsOpen(!isDetailsOpen);
  }
  return (
    <>
      <Cytoscape
        elements={elements}
        layout={layout}
        stylesheet={styles}
        cy={applyCytoscape(setCytoscape, {
          setSelectedPodcast,
          toggleModal,
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
