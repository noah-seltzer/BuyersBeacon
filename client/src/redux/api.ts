import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Beacon, Category } from "@/types/beacon";
import Cookies from "js-cookie";
import { createBeaconFormdata } from "../lib/beacon-utils";
import {
  User,
  Review,
  UserRating,
  PaginatedReviewsResponse,
} from "@/types/user";
import { Chat } from "@/types/chat";

export enum ENDPOINTS {
  CATEGORIES = "Categories",
  BEACONS = "Beacons",
  CHAT = "Chat"
}

enum CACHES {
  BEACONS = "Beacon",
  CATEGORIES = "Categories",
  DRAFTS = "Drafts",
  USERS = "Users",
  REVIEWS = "Reviews",
  TAGS = "Tags",
}

export const LIST_ID = "LIST";

export interface GetBeaconQueryInput {
  drafts?: boolean;
  userId?: string;
  CategoryId?: string;
  QueryString?: string;
}

const DEFAULT_URL = (process.env.API_URL || 'http://localhost:5037/api/')

export const beaconApi = createApi({
  tagTypes: [
    CACHES.BEACONS,
    CACHES.CATEGORIES,
    CACHES.DRAFTS,
    CACHES.USERS,
    CACHES.REVIEWS,
    CACHES.TAGS,
  ],
  reducerPath: "beaconApi",
  baseQuery: fetchBaseQuery({
    mode: "cors",
    baseUrl: DEFAULT_URL,
    prepareHeaders: (headers) => {
      const sessionToken = Cookies.get("__session");
      if (sessionToken) {
        headers.set("Authorization", `Bearer ${sessionToken}`);
      }
    },
  }),
  endpoints: (builder) => ({
    // Review endpoints
    getUserReviews: builder.query<
      PaginatedReviewsResponse,
      { userId: string; page?: number; pageSize?: number }
    >({
      query: ({ userId, page = 1, pageSize = 5 }) =>
        `reviews/user/${userId}?page=${page}&pageSize=${pageSize}`,
      providesTags: (_result, _error, { userId }) => [
        { type: CACHES.REVIEWS, id: userId },
        { type: CACHES.REVIEWS, id: LIST_ID },
      ],
      // Transform response for backward compatibility with existing components
      transformResponse: (response: PaginatedReviewsResponse) => {
        return {
          ...response,
          length: response.reviews.length,
        };
      },
    }),

    getUserRating: builder.query<UserRating, string>({
      query: (userId) => `reviews/user/${userId}/rating`,
      providesTags: (_result, _error, userId) => [
        { type: CACHES.REVIEWS, id: userId },
      ],
    }),

    createReview: builder.mutation<
      Review,
      { userId: string; rating: number; tagNames: string[] }
    >({
      query: ({ userId, ...reviewData }) => ({
        url: `reviews/user/${userId}`,
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: (_result, _error, { userId }) => [
        { type: CACHES.REVIEWS, id: userId },
        { type: CACHES.REVIEWS, id: LIST_ID },
        { type: CACHES.USERS, id: userId },
      ],
    }),

    deleteReview: builder.mutation<void, string>({
      query: (reviewId) => ({
        url: `reviews/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: CACHES.REVIEWS, id: LIST_ID }],
    }),

    getTags: builder.query<{ tagId: string; name: string }[], void>({
      query: () => "reviews/tags",
      providesTags: () => [{ type: CACHES.TAGS, id: LIST_ID }],
    }),

    getBeacons: builder.query<Beacon[], GetBeaconQueryInput | void>({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params?.userId) queryParams.append("userId", params.userId);
        if (params?.drafts) queryParams.append("drafts", "true");
        if (params?.CategoryId) queryParams.append("CategoryId", params.CategoryId);
        if (params?.QueryString) queryParams.append("QueryString", params.QueryString);
        return `${ENDPOINTS.BEACONS}?${queryParams.toString()}`;
      },
      transformResponse: (response: Beacon[]) =>
        response.map((beacon) => ({
          ...beacon,
          imageSet: {
            imageSetId: beacon.imageSet?.imageSetId,
            images: beacon.imageSet?.images || [],
            beaconId: beacon.imageSet?.beaconId,
          },
        })),
      providesTags: () => [
        { type: CACHES.BEACONS, id: LIST_ID },
        { type: CACHES.DRAFTS, id: LIST_ID },
      ],
    }),

    createBeacon: builder.mutation<Beacon, Beacon>({
      query: (payload) => {
        const formData = createBeaconFormdata(payload);
        return {
          url: ENDPOINTS.BEACONS,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: () => [
        { type: CACHES.BEACONS, id: LIST_ID },
        { type: CACHES.DRAFTS, id: LIST_ID },
      ],
    }),

    getAllCategories: builder.query<Category[], void>({
      query: () => ENDPOINTS.CATEGORIES,
      providesTags: () => [{ type: CACHES.CATEGORIES, id: LIST_ID }],
    }),

    getBeacon: builder.query<Beacon, string>({
      query: (id) => `${ENDPOINTS.BEACONS}/${id}`,
      transformResponse: (response: Beacon) => ({
        ...response,
        imageSet: {
          imageSetId: response.imageSet?.imageSetId,
          images: response.imageSet?.images || [],
          beaconId: response.imageSet?.beaconId,
        },
      }),
      providesTags: (_result, _error, id) => [{ type: CACHES.BEACONS, id }],
    }),

    updateBeacon: builder.mutation<void, { id: string; beacon: Beacon }>({
      query: ({ id, beacon }) => {
        const formData = createBeaconFormdata(beacon);
        return {
          url: `${ENDPOINTS.BEACONS}/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: CACHES.BEACONS, id },
      ],
    }),

    deleteBeacon: builder.mutation<void, string>({
      query: (id) => ({
        url: `${ENDPOINTS.BEACONS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [
        { type: CACHES.BEACONS, id: LIST_ID },
        { type: CACHES.DRAFTS, id: LIST_ID },
      ],
    }),

    getUserProfile: builder.query<User, string>({
      query: (id) => `users/profile/${id}`,
    }),

    updateProfile: builder.mutation<User, { id: string } & Partial<User>>({
      query: ({ id, ...profile }) => ({
        url: `users/profile/${id}`,
        method: "PUT",
        body: profile,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: CACHES.USERS, id },
        { type: CACHES.USERS, id: LIST_ID },
      ],
    }),

    getUserById: builder.query<User, string>({
      query: (id) => `users/${id}`,
      transformResponse: (response: any) => {
        return {
          UserId: response.userId,
          ClerkId: response.clerkId,
          displayName: response.displayName || "Anonymous User",
          bio: response.bio || "No bio yet",
          location: response.location || "Location not set",
          avatarUrl: response.avatarUrl,
          imageUrl: response.imageUrl || response.avatarUrl,
          joinedDate: response.joinedDate || new Date().toISOString(),
          averageRating: response.averageRating || 0,
          totalReviews: response.totalReviews || 0
        };
      },
      providesTags: (_result, _error, id) => [{ type: CACHES.USERS, id }],
    }),

    getUserByClerkId: builder.query<User, string>({
      query: (clerkId) => `users/clerk/${clerkId}`,
      transformResponse: (response: any) => {
        return {
          UserId: response.UserId,
          ClerkId: response.ClerkId,
          displayName: "Anonymous User",
          bio: "No bio yet",
          location: "Location not set",
          avatarUrl: "",
          joinedDate: new Date().toISOString(),
        };
      },
      async onQueryStarted(clerkId, { dispatch, queryFulfilled }) {
        try {
          const { data: initialUser } = await queryFulfilled;
          if (initialUser?.UserId) {
            dispatch(beaconApi.endpoints.getUserById.initiate(initialUser.UserId));
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      },
    }),

    uploadProfileImage: builder.mutation<{ url: string }, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("image", file);
        return {
          url: "users/profile-image",
          method: "POST",
          body: formData,
        };
      },
    }),

    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [
        { type: CACHES.USERS, id: LIST_ID },
        { type: CACHES.BEACONS, id: LIST_ID },
      ],
    }),
    getChat: builder.query<Chat, { chatId: string, clerkId: string }>({
      query: ({ chatId, clerkId }) => `${ENDPOINTS.CHAT}/${chatId}/${clerkId}`
    }),
    getChats: builder.query<Chat[], string>({
      query: (clerkId) => {
        return {
          url: `${ENDPOINTS.CHAT}`,
          params: {
            clerkId
          }

        }

      }
    })
  }),

});

export const {
  useGetBeaconsQuery,
  useCreateBeaconMutation,
  useGetAllCategoriesQuery,
  useGetBeaconQuery,
  useDeleteBeaconMutation,
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useGetUserByIdQuery,
  useGetUserByClerkIdQuery,
  useLazyGetUserByClerkIdQuery,
  useUploadProfileImageMutation,
  useDeleteUserMutation,
  // Review hooks
  useGetUserReviewsQuery,
  useGetUserRatingQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetTagsQuery,
  useLazyGetChatQuery,
  useLazyGetChatsQuery
} = beaconApi;