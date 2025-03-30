export interface User {
  id: string;
  clerk_user_id: string;
  displayName: string;
  bio: string;
  location: string;
  avatarUrl?: string;
  joinedDate: string;
  imageUrl?: string;
  averageRating?: number;
  totalReviews?: number;
}

export interface Review {
  reviewId: string;
  rating: number;
  createdAt: string;
  reviewer: {
    userId: string;
    displayName: string;
  };
  tags: string[];
}

export interface UserRating {
  averageRating: number;
  totalReviews: number;
  topTags: TagCount[];
}

export interface TagCount {
  tagName: string;
  count: number;
}

export interface PaginatedReviewsResponse {
  reviews: Review[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  // For backward compatibility with existing components
  length?: number;
}
