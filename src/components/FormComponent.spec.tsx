import React from 'react';
import { render, screen } from '@testing-library/react';
import FormDataComponent from './FormComponent';

test('renders learn react link', () => {
  const setLvr = () => {};
  render(<FormDataComponent onChangeLVR={setLvr}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
