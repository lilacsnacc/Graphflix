import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VideoList from './VideoList';

describe('<VideoList />', () => {
  test('it should mount', () => {
    render(<VideoList />);
    
    const videoList = screen.getByTestId('Video-List');

    expect(videoList).toBeInTheDocument();
  });
});