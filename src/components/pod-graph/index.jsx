import React from 'react';
import Cytoscape from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import klay from 'cytoscape-klay';
import panzoom from 'cytoscape-panzoom';
import normalizeData from './normalize-data';
import styles from './styles';
import Legend from './legend';

// TODO: Move to provider
cytoscape.use(klay);
panzoom(cytoscape);

const DEFAULTS = {
  zoomFactor: 0.05, // zoom factor per zoom tick
  zoomDelay: 45, // how many ms between zoom ticks
  minZoom: 0.1, // min zoom level
  maxZoom: 10, // max zoom level
  fitPadding: 50, // padding when fitting
  panSpeed: 10, // how many ms in between pan ticks
  panDistance: 10, // max pan distance per tick
  // the length of the pan drag box in which the vector for
  // panning is calculated (bigger = finer control of pan speed and direction)
  panDragAreaSize: 75,
  panMinPercentSpeed: 0.25, // the slowest speed we can pan by (as a percent of panSpeed)
  panInactiveArea: 8, // radius of inactive area in pan drag box
  // min opacity of pan indicator (the draggable nib); scales from this to 1.0
  panIndicatorMinOpacity: 0.5,
  // a minimal version of the ui only with zooming
  // (useful on systems with bad mousewheel resolution)
  zoomOnly: false,
  fitSelector: undefined, // selector of elements to fit
  animateOnFit() { // whether to animate on fit
    return false;
  },
  fitAnimationDuration: 1000, // duration of animation on fit

  // icon class names
  sliderHandleIcon: 'fa fa-minus',
  zoomInIcon: 'fa fa-plus',
  zoomOutIcon: 'fa fa-minus',
  resetIcon: 'fa fa-expand',
};

const LAYOUT = {
  fit: true, // whether to fit the viewport to the graph
  padding: 4, // the padding on fit
  name: 'klay',
  nodeSep: undefined, // the separation between adjacent nodes in the same rank
  edgeSep: undefined, // the separation between adjacent edges in the same rank
  rankSep: undefined, // the separation between each rank in the layout
  rankDir: 'TB', // 'TB' for top to bottom flow, 'LR' for left to right,
  ranker: 'network-simplex', // Type of algorithm to assign a rank to each node in the input graph. Possible values: 'network-simplex', 'tight-tree' or 'longest-path'
  minLen(edge) {
    return 1;
  }, // number of ranks to keep between the source and target of the edge
  edgeWeight(edge) {
    return 1;
  }, // higher weight edges are generally made shorter and straighter than lower weight edges
  spacingFactor: 5,
  // whether labels should be included in determining the space used by a node
  nodeDimensionsIncludeLabels: true,
  animate: true, // whether to transition the node positions
  animateFilter() {
    return true;
  },
  animationDuration: 500, // duration of animation in ms if enabled
  animationEasing: undefined, // easing of animation if enabled
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  transform(node, pos) {
    return pos;
  }, // a function that applies a transform to the final node position
  ready() {}, // on layoutready
  stop() {}, // on layoutstop
  klay: {
    spacing: 40,
    mergeEdges: false,
  },

};

function PodGraph() {
  const elements = Cytoscape.normalizeElements(normalizeData());
  const stylesheet = styles();

  function applyCy(cy) {
    window.cy = cy;
    cy.panzoom(DEFAULTS);
  }

  return (
    <>
      <Cytoscape
        elements={elements}
        layout={LAYOUT}
        stylesheet={stylesheet}
        cy={applyCy}
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
