export default function styles(cy) {
  Object.entries({
    'background-color': '#020202',
    // width: '38px',
    // height: '38px',
  }).forEach(([k, v]) => {
    cy.style().selector('node').style(k, v).update();
  });

  // EDGES
  Object.entries({
    'line-color': '#262626',
    color: '#9e9e9e',
    'source-arrow-color': '#262626',
    'curve-style': 'straight',
    'font-weight': 200,
    'font-size': '20px',
    'source-arrow-shape': 'square',
    'target-arrow-shape': 'triangle',
    width: 3,
  }).forEach(([k, v]) => {
    cy.style().selector('edge').style(k, v).update();
  });

  // COLAPSE NODES
  Object.entries({
    width: 56,
    height: 56,
  }).forEach(([k, v]) => {
    cy.style().selector('node.cy-expand-collapse-collapsed-node').style(k, v).update();
  });
  Object.entries({
    'background-color': '#030303',
    'background-opacity': '1',
    'border-width': '1px',
    'border-color': '#262626',
    color: '#000',
    shape: 'roundrectangle',
    'text-opacity': '0.56',
    'font-size': '10px',
    'text-transform': 'uppercase',
    'text-wrap': 'none',
    'text-max-width': '75px',
    'text-overflow-wrap': 'ellipsis',
    'padding-top': '16px',
    'padding-left': '16px',
    'padding-bottom': '16px',
    'padding-right': '16px',
  }).forEach(([k, v]) => {
    cy.style().selector('$node > node').style(k, v).update();
  });

  // parent
  Object.entries({
    'text-valign': 'bottom',
    'text-halign': 'center',
  }).forEach(([k, v]) => {
    cy.style().selector(':parent').style(k, v).update();
  });
}
