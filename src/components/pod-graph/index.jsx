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
      const matches = xs.filter(({ categories, keywords }) => categories
        .some(category => podcast.categories.includes(category))
        || keywords.some(keyword => podcast.keywords.includes(keyword)));
      if (!matches.length) return acc;

      return acc.concat(matches.map(match => ({
        edgeID: `${podcast.rssUrl}_${match.rssUrl}`,
        fromID: podcast.rssUrl,
        toID: match.rssUrl,
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
