import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BeaconInfoCard from '@/components/molecules/beacon-info-card';

// Mock dependencies
jest.mock('lucide-react', () => ({
  DollarSign: () => <div data-testid="dollar-sign-icon" />,
  MapPin: () => <div data-testid="map-pin-icon" />
}));

describe('BeaconInfoCard', () => {
  const mockHandleOnChat = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render price correctly', () => {
    render(
      <BeaconInfoCard 
        price={299.99} 
        location="New York, NY" 
        isOwner={false} 
        handleOnChat={mockHandleOnChat} 
      />
    );
    
    // Check if dollar sign icon is present
    expect(screen.getByTestId('dollar-sign-icon')).toBeInTheDocument();
    
    // Check if price is displayed correctly
    expect(screen.getByText('299.99')).toBeInTheDocument();
  });

  it('should handle undefined price gracefully', () => {
    render(
      <BeaconInfoCard 
        price={undefined} 
        location="New York, NY" 
        isOwner={false} 
        handleOnChat={mockHandleOnChat} 
      />
    );
    
    // Check if price falls back to 0.00
    expect(screen.getByText('0.00')).toBeInTheDocument();
  });

  it('should render location correctly', () => {
    render(
      <BeaconInfoCard 
        price={299.99} 
        location="Seattle, WA" 
        isOwner={false} 
        handleOnChat={mockHandleOnChat} 
      />
    );
    
    // Check if map pin icon is present
    expect(screen.getByTestId('map-pin-icon')).toBeInTheDocument();
    
    // Check if location is displayed correctly
    expect(screen.getByText('Seattle, WA')).toBeInTheDocument();
  });

  it('should not render location when it is not provided', () => {
    render(
      <BeaconInfoCard 
        price={299.99} 
        isOwner={false} 
        handleOnChat={mockHandleOnChat} 
      />
    );
    
    // Location section should not be present
    expect(screen.queryByText('Location')).not.toBeInTheDocument();
    expect(screen.queryByTestId('map-pin-icon')).not.toBeInTheDocument();
  });

  it('should show Get in Touch button for non-owners', () => {
    render(
      <BeaconInfoCard 
        price={299.99} 
        location="Seattle, WA" 
        isOwner={false} 
        handleOnChat={mockHandleOnChat} 
      />
    );
    
    // Check if Get in Touch button is present
    const button = screen.getByText('Get in Touch');
    expect(button).toBeInTheDocument();
    
    // Click the button
    fireEvent.click(button);
    
    // Check if handleOnChat was called
    expect(mockHandleOnChat).toHaveBeenCalledTimes(1);
  });

  it('should not show Get in Touch button for owners', () => {
    render(
      <BeaconInfoCard 
        price={299.99} 
        location="Seattle, WA" 
        isOwner={true} 
        handleOnChat={mockHandleOnChat} 
      />
    );
    
    // Button should not be present for owners
    expect(screen.queryByText('Get in Touch')).not.toBeInTheDocument();
  });
});