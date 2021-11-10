import { createGlobalStyle } from 'styled-components';
import 'cytoscape-panzoom/cytoscape.js-panzoom.css';

export default createGlobalStyle`
  :root {
    --color-body: #202022;
    --color-label: #797979; // Unsure if named well
  }

  html,
  body,
  #root {
    min-height: 100vh;
  }

  body {
    background-color: var(--color-body);
  }

  // panzoom controller
.cy-panzoom{
    top: 1rem;
      left: 1rem;
      color: #666;
}
.cy-panzoom-panner {
    background: #121213;
    border: 1px solid #23476d;
}
.cy-panzoom-slider-background {
    background: #121213;
    border-left: 1px solid #23476d;
    border-right: 1px solid #23476d;
}
.cy-panzoom-slider-handle {
    background: #121213;
    border: 1px solid #23476d;
}
.cy-panzoom-zoom-button {
    background: #121213;
    border: 1px solid #23476d;
}

`;
