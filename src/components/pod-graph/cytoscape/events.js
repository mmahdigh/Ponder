export default function applyEvents(cy, { setSelectedPodcast }) {
  cy.on('tap', 'node', event => setSelectedPodcast(event.target._private.data));
}
