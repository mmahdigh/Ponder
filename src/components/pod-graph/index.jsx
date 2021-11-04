import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Cytoscape from 'react-cytoscapejs';
import applyCytoscape from './cytoscape';
import { CytoscapeContext } from '../../providers/cytoscape';
import normalizeData from './normalize-data';
import layout from './layout';
import styles from './styles';
import Legend from './legend';
import PodcastDetails from '../podcast-details';
import { podcastPropType } from '../../prop-types';

function PodGraph({ subscriptions }) {
  const { setCytoscape } = useContext(CytoscapeContext);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const elements = Cytoscape.normalizeElements(normalizeData());

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
          backgroundCOlor: '#202022',
        }}
      />
      <Legend />
      <PodcastDetails isOpen={isDetailsOpen} close={() => setIsDetailsOpen(false)} />
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
