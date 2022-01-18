import cytoscape from 'cytoscape';
import panzoom from 'cytoscape-panzoom';

panzoom(cytoscape);

export default function applyPanzoom(cy) {
  cy.panzoom({
    // fitPadding: 10,
    fitSelector: ':visible',
    animateOnFit: true,
    animateOnZoom: true,
    zoomFactor: 0.05, // zoom factor per zoom tick
    zoomDelay: 45, // how many ms between zoom ticks
    minZoom: 3, // min zoom level
    maxZoom: 5, // max zoom level
    fitPadding: 50, // padding when fitting
    panSpeed: 10, // how many ms in between pan ticks
    panDistance: 10, // max pan distance per tick
    // the length of the pan drag box in which the vector for
    // panning is calculated (bigger = finer control of pan speed and direction)
    panDragAreaSize: 75,
    panMinPercentSpeed: 0.25, // the slowest speed we can pan by (as a percent of panSpeed)
    panInactiveArea: 8, // radius of inactive area in pan drag box
    // min opacity of pan indicator (the draggable nib); scales from this to 1.0
    panIndicatorMinOpacity: 0.5,
    // a minimal version of the ui only with zooming
    // (useful on systems with bad mousewheel resolution)
    zoomOnly: false,
    // fitSelector: undefined, // selector of elements to fit
    // animateOnFit() { // whether to animate on fit
    //   return false;
    // },
    fitAnimationDuration: 1000, // duration of animation on fit

    // icon class names
    sliderHandleIcon: 'fa fa-minus',
    zoomInIcon: 'fa fa-plus',
    zoomOutIcon: 'fa fa-minus',
    resetIcon: 'fa fa-expand',
  });
}
