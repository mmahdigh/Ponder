import cytoscape from 'cytoscape';
import layout from './layout';
import styles from './styles';
import applyPanzoom from './panzoom';
import applyEvents from './events';
import applyNodeGroups from './node-groups';

export default function createCytoscape(container, elements, deps) {
  const cy = cytoscape({
    container,
    elements,
    styles,
    layout,
  });
  applyPanzoom(cy, deps);
  applyEvents(cy, deps);
  applyNodeGroups(cy, deps);
  return cy;
}
