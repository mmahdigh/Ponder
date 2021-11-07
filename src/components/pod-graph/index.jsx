/* eslint-disable max-len */
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
  const [selectedPodcast, setSelectedPodcast] = useState({});
  const elements = Cytoscape.normalizeElements(normalizeData());

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
          backgroundCOlor: '#202022',
        }}
      />
      <Legend />
      <PodcastDetails
        title={title}
        imageUrl={imageUrl}
        isOpen={isDetailsOpen}
        description={description}
        close={() => setIsDetailsOpen(false)}
      />
    </>
  );
}

export default PodGraph;
