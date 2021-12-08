/* eslint-disable indent */
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import nodeHtmlLabel from 'cytoscape-node-html-label';
import expandCollapse from 'cytoscape-expand-collapse';
import layout from './layout';
import applyStyles from './styles';
import applyPanzoom from './panzoom';
import applyEvents from './events';
import applyNodeGroups from './node-groups';

cytoscape.use(dagre);
expandCollapse(cytoscape);
nodeHtmlLabel(cytoscape);

export default function createCytoscape(container, elements, deps) {
    const cy = cytoscape({
        container,
        elements,
        layout,

        zoomingEnabled: true,
        userZoomingEnabled: true,
        autoungrabify: false,
    });
    applyStyles(cy, deps);
    applyPanzoom(cy, deps);
    applyEvents(cy, deps);
    applyNodeGroups(cy, deps);
    cy.fit();
    cy.nodeHtmlLabel([]);

// NODE EVENTS
cy.on('mouseover', 'node', e => {
  e.target.addClass('hover');
});
cy.on('mouseout', 'node', e => {
  e.target.removeClass('hover');
});

cy.on('mousedown', 'node', e => {
  e.target.addClass('hover');
});

// EDGES EVENTS
cy.on('mouseover', 'edge', e => {
  e.target.addClass('hover');
});
cy.on('mouseout', 'edge', e => {
  e.target.removeClass('hover');
});

    return cy;
}
