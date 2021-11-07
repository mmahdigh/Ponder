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
`;
