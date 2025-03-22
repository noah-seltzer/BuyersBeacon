import { FC } from 'react';
import { StarRating } from './star-rating';
import { Badge } from '@/components/atoms/badge';
import { useGetUserRatingQuery } from '@/redux/api';
import { ClimbingBoxLoader } from 'react-spinners';

interface UserRatingSummaryProps {
  userId: string;
  showTags?: boolean;
  className?: string;
}

export const UserRatingSummary: FC<UserRatingSummaryProps> = ({
  userId,
  showTags = true,
  className,
}) => {
  const { data: rating, isLoading } = useGetUserRatingQuery(userId);
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-2">
        <ClimbingBoxLoader size={10} color="#24dbb7" />
      </div>
    );
  }
  
  if (!rating || rating.totalReviews === 0) {
    return (
      <div className={className}>
        <p className="text-xs font-medium text-muted-foreground bg-muted/40 px-2 py-1 rounded-full inline-block">
          No ratings yet
        </p>
      </div>
    );
  }
  
  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <StarRating value={rating.averageRating} size="sm" />
        <span className="text-sm font-medium text-primary/80 bg-primary/10 px-2 py-0.5 rounded-full">
          {rating.averageRating.toFixed(1)} ({rating.totalReviews})
        </span>
      </div>
      
      {showTags && rating.topTags && rating.topTags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {rating.topTags.slice(0, 3).map((tag) => (
            <Badge 
              key={tag.tagName} 
              variant="outline" 
              className="text-xs border-primary/20 bg-accent/30 text-accent-foreground hover:bg-primary/10 transition-colors"
            >
              {tag.tagName} ({tag.count})
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRatingSummary;