import { FC } from "react";
import { Card } from "@/components/atoms/card";
import { StarRating } from "./star-rating";
import { Badge } from "@/components/atoms/badge";
import { useGetUserReviewsQuery } from "@/redux/api";
import { ClimbingBoxLoader } from "react-spinners";
import { format } from "date-fns";
import { User } from "lucide-react";
import Link from "next/link";

interface ReviewsListProps {
  userId: string;
}

export const ReviewsList: FC<ReviewsListProps> = ({ userId }) => {
  const { data: reviews, isLoading } = useGetUserReviewsQuery(userId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-6">
        <ClimbingBoxLoader size={10} color="#24dbb7" />
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">No reviews yet</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.reviewId} className="p-4 border-border/30 hover:border-primary/30 hover:shadow-sm transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 rounded-full p-2">
                <User className="h-3.5 w-3.5 text-primary/80" />
              </div>
              <Link 
                href={`/profile/${review.reviewer.userId}`} 
                className="font-medium hover:text-primary hover:underline transition-colors"
              >
                {review.reviewer.displayName}
              </Link>
            </div>
            <div className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
              {format(new Date(review.createdAt), 'MMM d, yyyy')}
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-2">
            <StarRating value={review.rating} size="sm" />
            <span className="text-xs text-muted-foreground">
              ({review.rating}/5)
            </span>
          </div>
          
          {review.tags && review.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {review.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs bg-accent/50 text-accent-foreground border-primary/10 hover:bg-primary/10 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default ReviewsList;
