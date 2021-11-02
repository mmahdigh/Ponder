import React, { useContext } from 'react';
import Cytoscape from 'react-cytoscapejs';
import applyCytoscape from './cytoscape';
import { CytoscapeContext } from '../../providers/cytoscape';
import normalizeData from './normalize-data';
import layout from './layout';
import styles from './styles';
import Legend from './legend';

function PodGraph() {
  const { setCytoscape } = useContext(CytoscapeContext);
  const elements = Cytoscape.normalizeElements(normalizeData());

  return (
    <>
      <Cytoscape
        elements={elements}
        layout={layout}
        stylesheet={styles}
        cy={applyCytoscape(setCytoscape)}
        style={{
          minWidth: '100%',
          minHeight: 600,
          backgroundCOlor: '#202022',
        }}
      />
      <Legend />
    </>
  );
}

export default PodGraph;
