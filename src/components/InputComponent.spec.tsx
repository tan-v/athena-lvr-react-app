import React from 'react';
import { render, screen } from '@testing-library/react';
import InputComponent from './InputComponent';

test('renders learn react link', () => {
  const onChangeBorrowAmount = () => {};
  render(<InputComponent           
    label={'Borrow amount'}
    value={900}
    onChange={onChangeBorrowAmount} 
    error={'borrowAmount Error message'}/>);
    const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
