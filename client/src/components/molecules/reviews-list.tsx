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
        <Card key={review.reviewId} className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-muted rounded-full p-1.5">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
              <Link
                href={`/profile/${review.reviewer.userId}`}
                className="font-medium hover:underline"
              >
                {review.reviewer.displayName}
              </Link>
            </div>
            <div className="text-xs text-muted-foreground">
              {format(new Date(review.createdAt), 'MMM d, yyyy')}
            </div>
          </div>

          <div className="mt-3">
            <StarRating value={review.rating} size="sm" />
          </div>

          {review.tags && review.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {review.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
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
