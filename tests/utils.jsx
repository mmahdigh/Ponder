import React from 'react';
import { render as libRender } from '@testing-library/react';

export * from '@testing-library/react';

export function render(children) {
  return libRender(children);
}
