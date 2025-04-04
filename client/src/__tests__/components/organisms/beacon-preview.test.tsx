import React from 'react';
import { render, screen } from '@testing-library/react';
import { BeaconPreview } from '@/components/organisms/beacon-preview';
import { useUser } from '@clerk/nextjs';
import { useGetUserByClerkIdQuery, useGetUserByIdQuery } from '@/redux/api';

// Mock the required dependencies
jest.mock('@clerk/nextjs', () => ({
  useUser: jest.fn(),
}));

jest.mock('@/redux/api', () => ({
  useGetUserByClerkIdQuery: jest.fn(),
  useGetUserByIdQuery: jest.fn(),
}));

jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return children;
  };
});

jest.mock('lucide-react', () => ({
  User2: () => <div data-testid="user-icon" />,
  MapPin: () => <div data-testid="map-pin-icon" />,
  DollarSign: () => <div data-testid="dollar-icon" />,
  ArrowLeft: () => <div data-testid="arrow-left-icon" />,
  FileText: () => <div data-testid="file-text-icon" />,
}));

jest.mock('react-spinners', () => ({
  BeatLoader: () => <div data-testid="beat-loader">Loading...</div>,
}));

jest.mock('@/components/molecules/image-preview', () => ({
  __esModule: true,
  default: ({ images, alt }: { images: any[], alt: string }) => (
    <div data-testid="image-preview">
      {images && images.length > 0 ? 'Images Preview' : 'No Images'}
    </div>
  ),
}));

const mockBeacon = {
  ItemName: 'Test Beacon',
  ItemDescription: 'This is a test beacon description',
  ItemPrice: 299.99,
  Category: {
    CategoryName: 'Electronics'
  },
  LocCity: 'New York',
  LocRegion: 'NY',
  LocCountry: 'USA',
  Images: [{ url: 'test-image.jpg' }]
};

describe('BeaconPreview', () => {
  beforeEach(() => {
    // Setup default mock implementations
    (useUser as jest.Mock).mockReturnValue({
      user: {
        id: 'user123',
        fullName: 'John Doe',
        imageUrl: 'profile.jpg'
      }
    });

    (useGetUserByClerkIdQuery as jest.Mock).mockReturnValue({
      data: { UserId: 'db-user-123', displayName: 'John Doe DB' },
      isLoading: false
    });

    (useGetUserByIdQuery as jest.Mock).mockReturnValue({
      data: { displayName: 'John Full Profile', avatarUrl: 'avatar.jpg' },
      isLoading: false
    });
  });

  it('should render the beacon preview with correct data', () => {
    render(<BeaconPreview beacon={mockBeacon} />);

    // Check title and category
    expect(screen.getByText('Test Beacon')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    
    // Check description
    expect(screen.getByText('This is a test beacon description')).toBeInTheDocument();
    
    // Check price
    expect(screen.getByText('$299.99')).toBeInTheDocument();
    
    // Check location
    expect(screen.getByText('New York, NY, USA')).toBeInTheDocument();
    
    // Check user info is shown
    expect(screen.getByText(/Posted by John Full Profile/)).toBeInTheDocument();
    
    // Check action button
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
  });

  it('should display loading state properly', () => {
    // Mock loading states
    (useGetUserByClerkIdQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null
    });
    
    (useGetUserByIdQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null
    });

    render(<BeaconPreview beacon={mockBeacon} />);
    
    // In loading state, we should see animated elements
    const loadingElements = document.querySelectorAll('.animate-pulse');
    expect(loadingElements.length).toBeGreaterThan(0);
  });

  it('should handle missing data gracefully', () => {
    const incompleteBeacon = {
      ItemName: 'Incomplete Beacon',
      ItemDescription: '',
      Images: []
    };
    
    render(<BeaconPreview beacon={incompleteBeacon} />);
    
    // Check that it renders without crashing
    expect(screen.getByText('Incomplete Beacon')).toBeInTheDocument();
    expect(screen.getByText('$0.00')).toBeInTheDocument();
  });
});