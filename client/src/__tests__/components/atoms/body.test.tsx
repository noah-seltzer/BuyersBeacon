import React from 'react';
import { render, screen } from '@testing-library/react';
import BodyText from '@/components/atoms/text/body';

describe('BodyText', () => {
  it('should render the text content', () => {
    render(<BodyText>Hello World</BodyText>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<BodyText className="custom-class">Text with custom class</BodyText>);
    const text = screen.getByText('Text with custom class');
    expect(text).toHaveClass('custom-class');
  });
});