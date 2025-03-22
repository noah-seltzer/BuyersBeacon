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
        <p className="text-xs text-muted-foreground">No ratings yet</p>
      </div>
    );
  }
  
  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <StarRating value={rating.averageRating} size="sm" />
        <span className="text-sm text-muted-foreground">
          ({rating.totalReviews} {rating.totalReviews === 1 ? 'review' : 'reviews'})
        </span>
      </div>
      
      {showTags && rating.topTags && rating.topTags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {rating.topTags.slice(0, 3).map((tag) => (
            <Badge key={tag.tagName} variant="outline" className="text-xs">
              {tag.tagName} ({tag.count})
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRatingSummary;