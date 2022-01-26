import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FrontPage from './FrontPage';

describe('<FrontPage />', () => {
  test('it should mount', () => {
    render(<FrontPage />);
    
    const frontPage = screen.getByTestId('FrontPage');

    expect(frontPage).toBeInTheDocument();
  });
});