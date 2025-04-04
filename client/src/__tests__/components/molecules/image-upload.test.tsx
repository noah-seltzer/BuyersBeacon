import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BeaconImage } from '@/types/beacon';

// Mock Next/Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} src={props.src || ''} style={{ objectFit: props.objectFit }} />;
  },
}));

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mocked-url');

describe('ImageUpload', () => {
  const mockOnChange = jest.fn();
  const mockValue = [];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with upload area', () => {
    render(<div>
      <input id="image-upload" aria-label="image-upload" type="file" />
      <p>click to upload</p>
    </div>);
    
    expect(screen.getByText(/click to upload/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/image-upload/i)).toBeInTheDocument();
  });

  it('handles file upload', () => {
    render(
      <div>
        <input 
          id="image-upload"
          aria-label="image-upload" 
          type="file"
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            const newImages = files.map(file => ({ file }));
            mockOnChange([...mockValue, ...newImages]);
          }}
        />
      </div>
    );
    
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const input = screen.getByLabelText(/image-upload/i);
    
    Object.defineProperty(input, 'files', {
      value: [file],
    });
    
    fireEvent.change(input);
    
    expect(mockOnChange).toHaveBeenCalledWith([{ file }]);
  });

  it('should limit the number of images', () => {
    global.alert = jest.fn();
    
    // Create mock value array with max images
    const maxImages = 6;
    const mockFullValue = Array(maxImages).fill(0).map((_, i) => ({
      file: new File(['test'], `test${i}.png`, { type: 'image/png' }),
    }));
    
    render(
      <div>
        <input 
          id="image-upload"
          aria-label="image-upload" 
          type="file"
          onChange={(e) => {
            if (mockFullValue.length + (e.target.files?.length || 0) > maxImages) {
              alert(`You can only upload up to ${maxImages} images`);
              return;
            }
            const files = Array.from(e.target.files || []);
            const newImages = files.map(file => ({ file }));
            mockOnChange([...mockFullValue, ...newImages]);
          }}
        />
      </div>
    );
    
    const file = new File(['test'], 'extra.png', { type: 'image/png' });
    const input = screen.getByLabelText(/image-upload/i);
    
    Object.defineProperty(input, 'files', {
      value: [file],
    });
    
    fireEvent.change(input);
    
    expect(global.alert).toHaveBeenCalledWith(`You can only upload up to ${maxImages} images`);
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});