import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import layout from './layout';
import applyStyles from './styles';
import applyPanzoom from './panzoom';
import applyEvents from './events';
import applyNodeGroups from './node-groups';

cytoscape.use(dagre);

export default function createCytoscape(container, elements, deps) {
  const cy = cytoscape({
    container,
    elements,
    layout,
  });
  applyStyles(cy, deps);
  applyPanzoom(cy, deps);
  applyEvents(cy, deps);
  applyNodeGroups(cy, deps);
  cy.fit();
  return cy;
}
