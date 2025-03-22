import { FC, useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  value?: number; // Current rating (1-5)
  editable?: boolean; // Whether the rating can be changed
  onChange?: (rating: number) => void; // Callback when rating changes
  size?: 'sm' | 'md' | 'lg'; // Size of the stars
  className?: string;
}

export const StarRating: FC<StarRatingProps> = ({
  value = 0,
  editable = false,
  onChange,
  size = 'md',
  className,
}) => {
  const [hoverRating, setHoverRating] = useState<number>(0);
  
  // Size mapping
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };
  
  const starSize = sizeClasses[size];
  
  const handleClick = (rating: number) => {
    if (editable && onChange) {
      onChange(rating);
    }
  };
  
  const handleMouseEnter = (rating: number) => {
    if (editable) {
      setHoverRating(rating);
    }
  };
  
  const handleMouseLeave = () => {
    if (editable) {
      setHoverRating(0);
    }
  };
  
  // Generate 5 stars
  const stars = [...Array(5)].map((_, index) => {
    const rating = index + 1;
    const isFilled = hoverRating ? rating <= hoverRating : rating <= value;
    
    return (
      <Star
        key={index}
        className={cn(
          starSize,
          'transition-colors cursor-default',
          isFilled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300',
          editable && 'cursor-pointer'
        )}
        onClick={() => handleClick(rating)}
        onMouseEnter={() => handleMouseEnter(rating)}
        onMouseLeave={handleMouseLeave}
      />
    );
  });
  
  return (
    <div 
      className={cn('flex items-center gap-0.5', className)}
      role="radiogroup"
      aria-label="Rating"
    >
      {stars}
    </div>
  );
};

export default StarRating;