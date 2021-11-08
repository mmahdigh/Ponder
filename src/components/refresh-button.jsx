import React from 'react';
import { FaSync } from 'react-icons/fa';
import SpinButton from './spin-button';

function RefreshButton() {
  return (
    <SpinButton variant="info">
      <FaSync />
    </SpinButton>
  );
}

export default RefreshButton;
