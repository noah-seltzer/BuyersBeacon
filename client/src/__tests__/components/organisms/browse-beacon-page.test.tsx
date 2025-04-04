import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BrowseBeaconsPage from '@/components/organisms/beacons/browse-beacon-page';
import { useGetBeaconsQuery } from '@/redux/api';
import { useRouter, useSearchParams } from 'next/navigation';

// Mock the required dependencies
jest.mock('@/redux/api', () => ({
  useGetBeaconsQuery: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('lucide-react', () => ({
  Search: () => <div data-testid="search-icon" />,
  X: () => <div data-testid="x-icon" />,
}));

jest.mock('@/components/molecules/beacon-thumbnail', () => ({
  BeaconThumbnail: ({ beacon }) => (
    <div data-testid={`beacon-${beacon.BeaconId}`}>
      {beacon.ItemName}
    </div>
  ),
}));

// Sample beacon data
const mockBeacons = [
  {
    BeaconId: 1,
    ItemName: 'iPhone 13 Pro',
    ItemDescription: 'Mint condition iPhone',
    Category: { CategoryName: 'Electronics' },
    LocCity: 'New York',
    LocRegion: 'NY',
    IsDraft: false
  },
  {
    BeaconId: 2,
    ItemName: 'Desk Chair',
    ItemDescription: 'Ergonomic office chair',
    Category: { CategoryName: 'Furniture' },
    LocCity: 'Seattle',
    LocRegion: 'WA',
    IsDraft: false
  },
  {
    BeaconId: 3,
    ItemName: 'Draft Item',
    ItemDescription: 'This is a draft item',
    Category: { CategoryName: 'Other' },
    IsDraft: true
  }
];

describe('BrowseBeaconsPage', () => {
  const mockRouter = {
    push: jest.fn(),
  };
  
  const mockGet = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mock implementations
    (useGetBeaconsQuery as jest.Mock).mockReturnValue({
      data: mockBeacons,
      isLoading: false
    });
    
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    
    (useSearchParams as jest.Mock).mockReturnValue({
      get: mockGet.mockReturnValue(''),
    });
  });

  it('should render the page with beacons', () => {
    render(<BrowseBeaconsPage />);
    
    // Check page title
    expect(screen.getByText('Browse Beacons')).toBeInTheDocument();
    
    // Should show count of non-draft beacons
    expect(screen.getByText('2 Beacons available')).toBeInTheDocument();
    
    // Check if beacons are rendered (excluding drafts)
    expect(screen.getByTestId('beacon-1')).toBeInTheDocument();
    expect(screen.getByTestId('beacon-2')).toBeInTheDocument();
    expect(screen.queryByTestId('beacon-3')).not.toBeInTheDocument(); // Draft should not be shown
  });

  it('should filter beacons when searching', () => {
    // Mock search query
    mockGet.mockReturnValue('iPhone');
    
    render(<BrowseBeaconsPage />);
    
    // Should show filtered beacons count
    expect(screen.getByText('1 Beacons found')).toBeInTheDocument();
    
    // Only iPhone should be visible
    expect(screen.getByTestId('beacon-1')).toBeInTheDocument();
    expect(screen.queryByTestId('beacon-2')).not.toBeInTheDocument();
    
    // Should show search query chip
    expect(screen.getByText('Search results for:')).toBeInTheDocument();
    expect(screen.getByText('iPhone')).toBeInTheDocument();
  });

  it('should handle search form submission', () => {
    render(<BrowseBeaconsPage />);
    
    // Fill in search input
    const searchInput = screen.getByPlaceholderText(/Search by name/i);
    fireEvent.change(searchInput, { target: { value: 'chair' } });
    
    // Submit the form
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);
    
    // Should navigate to search results
    expect(mockRouter.push).toHaveBeenCalledWith('/beacons/browse?query=chair');
  });

  it('should clear search when clicking the clear button', () => {
    // Setup with existing search
    mockGet.mockReturnValue('desk');
    
    render(<BrowseBeaconsPage />);
    
    // Find and click the clear button (X icon)
    const clearButton = screen.getAllByTestId('x-icon')[0].closest('button');
    fireEvent.click(clearButton!);
    
    // Should navigate to base browse page
    expect(mockRouter.push).toHaveBeenCalledWith('/beacons/browse');
  });

  it('should display no results message when search has no matches', () => {
    // Setup with a search that won't match any beacons
    mockGet.mockReturnValue('nonexistent item');
    
    // Mock filtered beacons (empty array)
    (useGetBeaconsQuery as jest.Mock).mockReturnValue({
      data: mockBeacons,
      isLoading: false
    });
    
    render(<BrowseBeaconsPage />);
    
    // Should show no results message
    expect(screen.getByText('No Beacons Found')).toBeInTheDocument();
    expect(screen.getByText(/We couldn't find any beacons matching/)).toBeInTheDocument();
    
    // Should show button to view all
    expect(screen.getByText('View All Beacons')).toBeInTheDocument();
  });
});