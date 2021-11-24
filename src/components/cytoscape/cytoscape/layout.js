const layout = {
  fit: true, // whether to fit the viewport to the graph
  padding: 10, // the padding on fit
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

  klay: {
    addUnnecessaryBendpoints: false, // Adds bend points even if an edge does not change direction.
    borderSpacing: 20, // Minimal amount of space to be left to the border
    compactComponents: false, // Tries to further compact components (disconnected sub-graphs).
    crossingMinimization: 'LAYER_SWEEP', // Strategy for crossing minimization.
    cycleBreaking: 'GREEDY', // Strategy for cycle breaking. Cycle breaking looks for cycles in the graph and determines which edges to reverse to break the cycles. Reversed edges will end up pointing to the opposite direction of regular edges (that is, reversed edges will point left if edges usually point right).
    direction: 'LEFT', // Overall direction of edges: horizontal (right / left) or vertical (down / up)
    edgeRouting: 'SPLINES', // Defines how edges are routed (POLYLINE, ORTHOGONAL, SPLINES)
    // Factor by which the object spacing is multiplied to arrive
    // at the minimal spacing between edges.
    edgeSpacingFactor: 4,
    // Whether feedback edges should be highlighted by routing around the nodes.
    feedbackEdges: true,
    fixedAlignment: 'BALANCED',
    // Factor by which the usual spacing is multiplied
    // to determine the in-layer spacing between objects.
    inLayerSpacingFactor: 3,
    // Dampens the movement of nodes to keep the diagram from getting too large.
    linearSegmentsDeflectionDampening: 3,
    // Edges that have no ports are merged so they touch the connected nodes at the same points.
    mergeEdges: true,
    mergeHierarchyCrossingEdges: true, // If hierarchical layout is active, hierarchy-crossing edges use as few hierarchical ports as possible.
    nodeLayering: 'INTERACTIVE', // Strategy for node layering.

    nodePlacement: 'BRANDES_KOEPF', // Strategy for Node Placement

    randomizationSeed: 1, // Seed used for pseudo-random number generators to control the layout algorithm; 0 means a new seed is generated
    routeSelfLoopInside: true, // Whether a self-loop is routed around or inside its node.
    thoroughness: 110, // How much effort should be spent to produce a nice layout..

  },

};

export default layout;
