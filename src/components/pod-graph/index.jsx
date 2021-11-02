import React, { useContext, useState } from 'react';
import Cytoscape from 'react-cytoscapejs';
import applyCytoscape from './cytoscape';
import { CytoscapeContext } from '../../providers/cytoscape';
import normalizeData from './normalize-data';
import layout from './layout';
import styles from './styles';
import Legend from './legend';
import PodcastDetails from '../podcast-details';

function PodGraph() {
  const { setCytoscape } = useContext(CytoscapeContext);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const elements = Cytoscape.normalizeElements(normalizeData());
  console.log(selectedPodcast);

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

export default PodGraph;
