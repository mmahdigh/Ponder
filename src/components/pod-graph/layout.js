const layout = {
  fit: true, // whether to fit the viewport to the graph
  padding: 10, // the padding on fit
  name: 'klay',
  klay: {
    spacing: 40,
    mergeEdges: false,
  },
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

  // general layout options
  // Applies a multiplicative factor (>0) to expand or
  // compress the overall area that the nodes take up
  spacingFactor: 5,
  // whether labels should be included in determining the space used by a node
  nodeDimensionsIncludeLabels: true,
  animate: true, // whether to transition the node positions

  // whether to animate specific nodes when animation is on; non-animated nodes
  // immediately go to their final positions
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
};

export default layout;