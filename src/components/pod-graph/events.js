export default function applyEvents(cy, { setSelectedPodcast }) {
  cy.on('tap', 'node', setSelectedPodcast);
}
