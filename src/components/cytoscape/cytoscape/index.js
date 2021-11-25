import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import layout from './layout';
import styles from './styles';
import applyPanzoom from './panzoom';
import applyEvents from './events';
import applyNodeGroups from './node-groups';

cytoscape.use(dagre);

export default function createCytoscape(container, elements, deps) {
  const cy = cytoscape({
    container,
    elements,
    layout,
    styles: styles(),
  });
  applyPanzoom(cy, deps);
  applyEvents(cy, deps);
  applyNodeGroups(cy, deps);
  return cy;
}
