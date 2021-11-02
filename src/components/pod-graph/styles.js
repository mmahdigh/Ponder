const styles = () => {
  const nodeStyle = {
    shape: 'roundrectangle',
    'background-color': 'data(NodesBg)',
    'background-opacity': 0.6,
    'background-image': 'data(bgImg)',
    'background-fit': 'cover cover',
    'background-image-opacity': 0.1,
    width: 250,
    height: 250,
    avoidOverlap: true, // if true, prevents overlap of node bounding boxes
    // whether labels should be included in determining the space used by a node
    nodeDimensionsIncludeLabels: true,
    'text-outline-width': 1,
    padding: 20,
    'padding-relative-to': 'width',
    color: 'white',
    'font-family': 'Helvetica',
    'font-weight': 400,
    'font-size': 20,
    label: 'data(label)',
    'text-halign': 'center',
    'text-valign': 'center',
    'text-max-width': '200px',
    'text-wrap': 'wrap',
    'text-overflow-wrap': 'anywhere',
    'text-justification': 'center',
    'line-height': 1.5,
  };

  return [{
    selector: 'node',
    style: nodeStyle,
  },
  {
    selector: 'edge',
    style: {
      'line-color': '#79797a',
      color: 'white',
      'source-arrow-color': '#79797a',
      label: 'data(label)',
      'curve-style': 'straight',
      'font-weight': 200,
      'font-size': '20px',
      'source-arrow-shape': 'square',
      'target-arrow-shape': 'triangle',
      'text-halign': 'center',
      'text-valign': 'center',
      'text-max-width': 120,
      'text-wrap': 'wrap',
      'text-overflow-wrap': 'anywhere',
      'text-justification': 'center',
      // 'text-rotation': 'autorotate',
      'text-background-color': '#79797a',
      'text-background-shape': 'roundrectangle',
      'text-border-color': '#000',
      'text-border-width': 2,
      'text-border-opacity': 1,
      'text-background-opacity': 0.6,
      'text-background-padding': '6px',
      width: 3,
      'line-style': 'data(EdgeStyle)',
    },
  },
  ];
};

export default styles;
