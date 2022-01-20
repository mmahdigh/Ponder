export default function applyNodeGroups(cy) {
  initializeZoomExtrema(cy);
  fitGraph(cy);
}
// function to center the graph by default
function fitGraph(cy) {
  return cy.fit();
}
function initializeZoomExtrema(cy) {
  // find a good MAXIMUM_ZOOM_LEVEL and DEFAULT_LAYOUT_ZOOM_LEVEL
  const DEFAULT_LAYOUT_ZOOM_LEVEL = 0.5;
  const MAXIMUM_ZOOM_LEVEL = 3;

  // Set the viewport so it centers/zooms the graph.
  cy.fit(); // or cy.reset()
  cy.maxZoom(MAXIMUM_ZOOM_LEVEL);
  let min_zoom = cy.zoom();

  if (min_zoom > DEFAULT_LAYOUT_ZOOM_LEVEL) {
    // Ensure you can atleast zoom out to the DEFAULT_LAYOUT_ZOOM_LEVEL.
    min_zoom = DEFAULT_LAYOUT_ZOOM_LEVEL;
  } else {
    // At this point, `min_zoom` corresponds to the zoom distance where all
    // podcasts fit. Allow zooming out twice as far, to compensate for smaller screens.
    min_zoom *= 0.5;
  }
  cy.minZoom(min_zoom);
  cy.maxZoom(MAXIMUM_ZOOM_LEVEL);
  cy.panzoom({ maxZoom: MAXIMUM_ZOOM_LEVEL, minZoom: min_zoom });
}
