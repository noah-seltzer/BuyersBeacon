import React from 'react';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import CreateBeaconPage from '@/components/organisms/beacons/create-beacon-page';
import { useRouter } from 'next/navigation';
import { useCreateBeaconMutation, useGetAllCategoriesQuery } from '@/redux/api';
import { User } from '@/types/user';
import * as formik from 'formik';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

jest.mock('@/redux/api', () => ({
  useCreateBeaconMutation: jest.fn(),
  useGetAllCategoriesQuery: jest.fn()
}));

jest.mock('@/helpers/navigation', () => ({
  navigateToBeaconDetailsPage: jest.fn()
}));

jest.mock('@/components/templates/create-beacon-template', () => ({
  __esModule: true,
  default: (props) => (
    <div data-testid="create-beacon-template">
      <button 
        data-testid="submit-button" 
        onClick={() => props.handleSubmit()}
        disabled={props.submitting}
      >
        Submit
      </button>
      <button 
        data-testid="save-draft-button" 
        onClick={props.onSaveDraft}
      >
        Save Draft
      </button>
      <div data-testid="category-options">
        {props.categoryOptions.map(opt => <div key={opt.value}>{opt.label}</div>)}
      </div>
      {props.draftSaved && <div data-testid="draft-saved">Draft saved successfully</div>}
      {props.draftError && <div data-testid="draft-error">{props.draftError}</div>}
    </div>
  )
}));

describe('CreateBeaconPage', () => {
  const mockUser: User = {
    UserId: 'user123',
    displayName: 'Test User',
    email: 'test@example.com'
  };

  const mockCategories = [
    { CategoryId: 'cat1', CategoryName: 'electronics' },
    { CategoryId: 'cat2', CategoryName: 'furniture' }
  ];

  const mockRouterPush = jest.fn();
  const mockCreateBeacon = jest.fn();
  const mockUnwrap = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock router
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush
    });
    
    // Mock create beacon mutation
    mockCreateBeacon.mockReturnValue({ unwrap: mockUnwrap });
    (useCreateBeaconMutation as jest.Mock).mockReturnValue([mockCreateBeacon]);
    
    // Mock categories query
    (useGetAllCategoriesQuery as jest.Mock).mockReturnValue({
      data: mockCategories,
      isLoading: false,
      error: null
    });
  });

  it('should transform categories into options with proper formatting', async () => {
    render(<CreateBeaconPage user={mockUser} />);
    
    // Check if categories are properly transformed
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Furniture')).toBeInTheDocument();
  });

  it('should test the form submission process', async () => {
    // Replace the formik hook with our mock implementation
    const mockUseFormik = jest.spyOn(formik, 'useFormik');
    const mockHandleSubmit = jest.fn();
    
    // Create mock form values with a title
    const mockValues = {
      ItemName: 'Test Beacon Title',
      ItemDescription: 'Test description',
      Images: [],
      ItemPrice: 99.99,
      CategoryId: 'cat1'
    };
    
    // Mock formik to return our test values
    mockUseFormik.mockReturnValue({
      handleChange: jest.fn(),
      handleSubmit: mockHandleSubmit,
      values: mockValues,
      errors: {},
      touched: {},
      setFieldValue: jest.fn(),
      isSubmitting: false
    } as any);
    
    render(<CreateBeaconPage user={mockUser} />);
    
    // Check if categories are rendered correctly
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Furniture')).toBeInTheDocument();
    
    // Verify form submission works
    const submitButton = screen.getByTestId('submit-button');
    act(() => {
      submitButton.click();
    });
    
    // Check if the form submission handler was called
    expect(mockHandleSubmit).toHaveBeenCalled();
    
    // Clean up mock
    mockUseFormik.mockRestore();
  });

  it('should display UI components correctly', () => {
    render(<CreateBeaconPage user={mockUser} />);
    
    // Test that key UI elements are rendered
    expect(screen.getByTestId('create-beacon-template')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    expect(screen.getByTestId('save-draft-button')).toBeInTheDocument();
    expect(screen.getByTestId('category-options')).toBeInTheDocument();
  });

  it('should test the draft save button is rendered', () => {
    // Setup API response
    mockUnwrap.mockResolvedValueOnce({ BeaconId: 'new-beacon-456' });
    
    // Mock handleApiError to avoid dependency on external utility
    jest.mock('@/lib/utils', () => ({
      handleApiError: jest.fn()
    }));

    render(<CreateBeaconPage user={mockUser} />);
    
    // Test that the save draft button exists and is enabled
    const saveDraftButton = screen.getByTestId('save-draft-button');
    expect(saveDraftButton).toBeInTheDocument();
    expect(saveDraftButton).not.toBeDisabled();
  });
});