import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/components/atoms/input';

describe('Input', () => {
  it('should render correctly', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('should handle value changes', async () => {
    const handleChange = jest.fn();
    render(<Input placeholder="Enter your name" onChange={handleChange} />);
    
    const input = screen.getByPlaceholderText('Enter your name');
    await userEvent.type(input, 'John Doe');
    
    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue('John Doe');
  });

  it('should apply custom className', () => {
    render(<Input className="custom-class" data-testid="custom-input" />);
    const input = screen.getByTestId('custom-input');
    
    expect(input).toHaveClass('custom-class');
  });

  it('should support different input types', () => {
    render(<Input type="password" placeholder="Password" />);
    const input = screen.getByPlaceholderText('Password');
    
    expect(input).toHaveAttribute('type', 'password');
  });

  it('should respect disabled state', () => {
    render(<Input disabled placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText('Disabled input');
    
    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:opacity-50');
  });
});