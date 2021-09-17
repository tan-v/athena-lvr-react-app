import React from 'react';
import { render } from '@testing-library/react';
import HeaderComponent from './HeaderComponent';

test.only('renders Header with icon and button', () => {
  const screen = render(<HeaderComponent />)
  expect(screen.getByAltText('logo')).toBeInTheDocument()
})