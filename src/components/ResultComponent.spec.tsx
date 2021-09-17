import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultComponent from './ResultComponent';

test('renders learn react link', () => {
  render(<ResultComponent           
    lvrPercentage={10}/>);
    const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
