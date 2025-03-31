import { Beacon } from "./beacon";
import { Chat } from "./chat";

export interface User {
  UserId: string;
  ClerkId: string;
  Beacons?: Beacon[],
  Chats?: Chat[],
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
