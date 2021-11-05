import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Cytoscape from 'react-cytoscapejs';
import applyCytoscape from './cytoscape';
import { CytoscapeContext } from '../../providers/cytoscape';
import layout from './layout';
import styles from './styles';
import Legend from './legend';
import PodcastDetails from '../podcast-details';
import { podcastPropType } from '../../prop-types';

function PodGraph({ subscriptions }) {
  const { setCytoscape } = useContext(CytoscapeContext);
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  const elements = Cytoscape.normalizeElements({
    nodes: subscriptions.map(({ episodes, ...podcast }) => ({ data: podcast })),
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

PodGraph.propTypes = {
  subscriptions: PropTypes.arrayOf(podcastPropType),
};

PodGraph.defaultProps = {
  subscriptions: [],
};

export default PodGraph;
