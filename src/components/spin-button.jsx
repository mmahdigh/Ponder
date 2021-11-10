import styled from 'styled-components';
import { Button as BsButton } from 'react-bootstrap';

const SpinButton = styled(BsButton)`
  svg {
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    animation: none;
  }
  &:disabled svg {
    animation: spin 1s infinite;
  }
`;

export default SpinButton;
