import { FC, useState } from "react";
import { Card } from "@/components/atoms/card";
import { StarRating } from "./star-rating";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import { useGetUserReviewsQuery, useGetUserByIdQuery } from "@/redux/api";
import { ClimbingBoxLoader } from "react-spinners";
import { format } from "date-fns";
import { User2, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

interface ReviewerAvatarProps {
  userId: string;
}

const ReviewerAvatar: FC<ReviewerAvatarProps> = ({ userId }) => {
  const { data: userData } = useGetUserByIdQuery(userId);
  const { user: clerkUser } = useUser();

  const avatarUrl = userData?.avatarUrl || clerkUser?.imageUrl || "/default-avatar.png";

  return (
    <div className="relative h-8 w-8">
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={userData?.displayName || "User"}
          fill
          className="rounded-full object-cover border-2 border-primary/10"
          sizes="32px"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.style.display = "none"; // Hide the image on error
          }}
        />
      ) : (
        <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center">
          <User2 className="h-4 w-4 text-primary/80" />
        </div>
      )}
    </div>
  );
};

interface ReviewsListProps {
  userId: string;
  pageSize?: number;
}

export const ReviewsList: FC<ReviewsListProps> = ({ userId, pageSize = 5 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const { 
    data: reviewsData, 
    isLoading,
    isFetching
  } = useGetUserReviewsQuery({ 
    userId, 
    page: currentPage, 
    pageSize 
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Scroll to top of reviews list
    document.getElementById('reviews-list-top')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-6">
        <ClimbingBoxLoader size={10} color="#24dbb7" />
      </div>
    );
  }

  if (!reviewsData || reviewsData.reviews.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">No reviews yet</p>
      </Card>
    );
  }

  const { reviews, totalPages, page } = reviewsData;

  return (
    <div className="space-y-4 relative" id="reviews-list-top">
      {isFetching && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex justify-center items-center z-10">
          <ClimbingBoxLoader size={10} color="#24dbb7" />
        </div>
      )}
      
      {reviews.map((review) => (
        <Card key={review.reviewId} className="p-4 border-border/30 hover:border-primary/30 hover:shadow-sm transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <ReviewerAvatar userId={review.reviewer.userId} />
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-border/30">
          <div className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              aria-label="Previous page"
              className="h-8 w-8 p-0 rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                // Show pages around current page if total pages > 5
                let pageNum = i + 1;
                if (totalPages > 5) {
                  if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    className={`h-8 w-8 p-0 rounded-full ${
                      pageNum === page ? "bg-primary text-primary-foreground" : ""
                    }`}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
              aria-label="Next page"
              className="h-8 w-8 p-0 rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsList;