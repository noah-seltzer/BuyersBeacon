import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { StarRating } from '@/components/molecules/star-rating';

// Mock the Lucide React Star component
jest.mock('lucide-react', () => ({
  Star: ({ className, onClick, onMouseEnter, onMouseLeave }) => (
    <svg 
      data-testid="star-icon"
      className={className}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  ),
}));

describe('StarRating', () => {
  it('should render 5 stars', () => {
    render(<StarRating />);
    
    const stars = screen.getAllByTestId('star-icon');
    expect(stars).toHaveLength(5);
  });

  it('should highlight stars based on provided value', () => {
    render(<StarRating value={3} />);
    
    const stars = screen.getAllByTestId('star-icon');
    
    // First 3 stars should be filled
    expect(stars[0]).toHaveClass('fill-yellow-400');
    expect(stars[1]).toHaveClass('fill-yellow-400');
    expect(stars[2]).toHaveClass('fill-yellow-400');
    
    // Last 2 stars should not be filled
    expect(stars[3]).not.toHaveClass('fill-yellow-400');
    expect(stars[4]).not.toHaveClass('fill-yellow-400');
  });

  it('should call onChange when clicking a star in editable mode', () => {
    const handleChange = jest.fn();
    render(<StarRating editable onChange={handleChange} />);
    
    const stars = screen.getAllByTestId('star-icon');
    fireEvent.click(stars[3]); // Click the 4th star
    
    expect(handleChange).toHaveBeenCalledWith(4);
  });

  it('should not call onChange when clicking a star in non-editable mode', () => {
    const handleChange = jest.fn();
    render(<StarRating editable={false} onChange={handleChange} />);
    
    const stars = screen.getAllByTestId('star-icon');
    fireEvent.click(stars[2]); // Click the 3rd star
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should apply hover effect in editable mode', () => {
    render(<StarRating editable />);
    
    const stars = screen.getAllByTestId('star-icon');
    
    fireEvent.mouseEnter(stars[2]);
    
    // First 3 stars should have the filled class
    expect(stars[0]).toHaveClass('fill-yellow-400');
    expect(stars[1]).toHaveClass('fill-yellow-400');
    expect(stars[2]).toHaveClass('fill-yellow-400');
    
    fireEvent.mouseLeave(stars[2]);
  });

  it('should render stars with different sizes', () => {
    const { rerender } = render(<StarRating size="sm" />);
    
    let stars = screen.getAllByTestId('star-icon');
    expect(stars[0]).toHaveClass('w-3');
    
    rerender(<StarRating size="lg" />);
    stars = screen.getAllByTestId('star-icon');
    expect(stars[0]).toHaveClass('w-6');
  });

  it('should have appropriate aria attributes for accessibility', () => {
    render(<StarRating />);
    
    const container = screen.getByRole('radiogroup');
    expect(container).toHaveAttribute('aria-label', 'Rating');
  });
});