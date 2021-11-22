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
      z-index: 100;
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

// scroll bars
/* width */
::-webkit-scrollbar {
  width: 1px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(44, 43, 43);
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #2b2c2b;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background:#2b2c2b;
}

// styling the modal
.modal-content {
    background-color: #16181a;
    color: #868686;

}
.modal-header {
    border-bottom: 1px solid #2c2c2c;
}

.modal-footer {
  border-top: 1px solid #2c2c2c;
}
`;
