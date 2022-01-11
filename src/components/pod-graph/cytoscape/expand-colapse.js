import cytoscape from 'cytoscape';
import expandCollapse from 'cytoscape-expand-collapse';

if (typeof cytoscape('core', 'expandCollapse') === 'undefined') {
  expandCollapse(cytoscape);
}

export default function applyExpandColapse(cy) {
  cy.expandCollapse({
    layoutBy: {
      name: 'dagre',
      animate: 'end',
      randomize: false,
      fit: false,
    },
    fisheye: false,
    animate: true,
    undoable: false,
    cueEnabled: true,
    expandCollapseCuePosition: 'top-left',
    expandCollapseCueSize: 16,
    expandCollapseCueLineSize: 24,
    // expandCueImage: '../assets/img/ic_expand_more.svg',
    // collapseCueImage: '../assets/img/ic_expand_less.svg',
    expandCollapseCueSensitivity: 1,
    edgeTypeInfo: 'edgeType',
    groupEdgesOfSameTypeOnCollapse: false,
    allowNestedEdgeCollapse: true,
    zIndex: 999,
  });
}
