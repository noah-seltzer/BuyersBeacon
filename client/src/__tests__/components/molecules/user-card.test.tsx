import React from 'react';
import { render, screen } from '@testing-library/react';
import UserCard from '@/components/molecules/user-card';
import { User } from '@/types/user';

// Mock dependencies
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }) => <img src={src} alt={alt} />
}));

jest.mock('next/link', () => {
  return ({ href, children }) => <a href={href}>{children}</a>;
});

jest.mock('lucide-react', () => ({
  User2: () => <div data-testid="user-icon" />,
  MapPin: () => <div data-testid="map-pin-icon" />,
  Calendar: () => <div data-testid="calendar-icon" />
}));

// Add a test ID to the mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }) => <img src={src} alt={alt} data-testid="next-image" />
}));

jest.mock('@/components/molecules/user-rating-summary', () => ({
  __esModule: true,
  default: ({ userId }) => <div data-testid="user-rating">Rating for {userId}</div>
}));

describe('UserCard', () => {
  const mockUser: User = {
    UserId: '123',
    displayName: 'John Doe',
    location: 'New York, NY',
    joinedDate: '2023-01-15T00:00:00Z',
    email: 'john@example.com'
  };

  it('should render user information correctly', () => {
    render(<UserCard userData={mockUser} avatarUrl="/avatar.jpg" />);
    
    // Check if user name is displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    
    // Check if location is displayed
    expect(screen.getByText('New York, NY')).toBeInTheDocument();
    
    // Check if join date is displayed (formatted)
    expect(screen.getByText(/Member since Jan 2023/)).toBeInTheDocument();
    
    // Check if rating is displayed
    expect(screen.getByTestId('user-rating')).toBeInTheDocument();
    
    // Check if "View Full Profile" button is displayed
    expect(screen.getByText('View Full Profile')).toBeInTheDocument();
  });

  it('should handle missing user data gracefully', () => {
    const { container } = render(<UserCard userData={undefined} />);
    
    // Component should return null
    expect(container).toBeEmptyDOMElement();
  });

  it('should show default avatar when avatarUrl is not provided', () => {
    const { container } = render(<UserCard userData={mockUser} />);
    
    // Use getAllByTestId since there are multiple user icons
    const userIcons = screen.getAllByTestId('user-icon');
    expect(userIcons.length).toBeGreaterThan(0);
    
    // Check that no Next.js Image is rendered
    expect(screen.queryByTestId('next-image')).not.toBeInTheDocument();
  });

  it('should display Anonymous User when displayName is missing', () => {
    const userWithoutName = { ...mockUser, displayName: undefined };
    render(<UserCard userData={userWithoutName} />);
    
    expect(screen.getByText('Anonymous User')).toBeInTheDocument();
  });

  it('should not show location when it is missing', () => {
    const userWithoutLocation = { ...mockUser, location: undefined };
    render(<UserCard userData={userWithoutLocation} />);
    
    expect(screen.queryByTestId('map-pin-icon')).not.toBeInTheDocument();
  });

  it('should not show join date when it is missing', () => {
    const userWithoutJoinDate = { ...mockUser, joinedDate: undefined };
    render(<UserCard userData={userWithoutJoinDate} />);
    
    expect(screen.queryByTestId('calendar-icon')).not.toBeInTheDocument();
  });

  it('should not show rating or profile button when UserId is missing', () => {
    const userWithoutId = { ...mockUser, UserId: undefined };
    render(<UserCard userData={userWithoutId} />);
    
    expect(screen.queryByTestId('user-rating')).not.toBeInTheDocument();
    expect(screen.queryByText('View Full Profile')).not.toBeInTheDocument();
  });
});