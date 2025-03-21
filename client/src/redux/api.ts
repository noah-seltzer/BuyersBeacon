import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Beacon, Category } from "@/types/beacon";
import Cookies from "js-cookie";
import { createBeaconFormdata } from "../lib/beacon-utils";
import { User } from "@/types/user";

export enum ENDPOINTS {
  CATEGORIES = "Categories",
  BEACONS = "Beacons",
}
enum CACHES {
  BEACONS = "Beacon",
  CATEGORIES = "Categories",
  DRAFTS = "Drafts",
  USERS = "Users",
}

export const LIST_ID = "LIST";

export interface GetBeaconQueryInput {
  drafts?: boolean;
  userId?: string;
}

export const beaconApi = createApi({
  tagTypes: [CACHES.BEACONS, CACHES.CATEGORIES, CACHES.DRAFTS, CACHES.USERS],
  reducerPath: "beaconApi",
  baseQuery: fetchBaseQuery({
    mode: "cors",
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5037/api",
    prepareHeaders: (headers) => {
      const sessionToken = Cookies.get("__session");
      if (sessionToken) {
        headers.set("Authorization", `Bearer ${sessionToken}`);
      }
    },
  }),

  endpoints: (builder) => ({
    getBeacons: builder.query<Beacon[], GetBeaconQueryInput>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.userId) queryParams.append("userId", params.userId);
        if (params?.drafts) queryParams.append("drafts", "true");
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
          id: response.userId,
          clerk_user_id: response.clerkId,
          displayName: response.displayName || "Anonymous User",
          bio: response.bio || "No bio yet",
          location: response.location || "Location not set",
          avatarUrl: response.avatarUrl,
          imageUrl: response.imageUrl,
          joinedDate: response.joinedDate || new Date().toISOString(),
        };
      },
      providesTags: (_result, _error, id) => [{ type: CACHES.USERS, id }],
    }),
    getUserByClerkId: builder.query<User, string>({
      query: (clerkId) => `users/clerk/${clerkId}`,
      transformResponse: (response: any) => ({
        id: response.userId,
        clerk_user_id: response.clerkId,
        displayName: response.displayName || "Anonymous User",
        bio: response.bio || "No bio yet",
        location: response.location || "Location not set",
        avatarUrl: response.avatarUrl,
        joinedDate: response.joinedDate || new Date().toISOString(),
      }),
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
  useUploadProfileImageMutation,
} = beaconApi;
