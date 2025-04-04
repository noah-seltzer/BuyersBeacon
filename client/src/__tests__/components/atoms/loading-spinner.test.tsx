import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '@/components/atoms/loading-spinner';

// Mock the react-spinners component
jest.mock('react-spinners', () => ({
  ClimbingBoxLoader: jest.fn(() => <div data-testid="mock-loader">Loading...</div>),
}));

describe('LoadingSpinner', () => {
  it('should render correctly', () => {
    render(<LoadingSpinner />);
    
    expect(screen.getByTestId('mock-loader')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<LoadingSpinner className="custom-class" />);
    
    const spinnerContainer = container.firstChild;
    expect(spinnerContainer).toHaveClass('custom-class');
    expect(spinnerContainer).toHaveClass('flex');
    expect(spinnerContainer).toHaveClass('min-h-screen');
  });

  it('should have centered content', () => {
    const { container } = render(<LoadingSpinner />);
    
    const spinnerContainer = container.firstChild;
    expect(spinnerContainer).toHaveClass('items-center');
    expect(spinnerContainer).toHaveClass('justify-center');
  });
});