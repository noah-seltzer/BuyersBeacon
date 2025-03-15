import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Beacon, Category } from "@/types/beacon";

export enum ENDPOINTS {
  CATEGORIES = "Categories",
  BEACONS = "Beacons",
  DRAFTS = "Beacons/drafts",
}
enum CACHES {
  BEACONS = "Beacon",
  CATEGORIES = "Categories",
  DRAFTS = "Drafts",
}

export const beaconApi = createApi({
  tagTypes: [CACHES.BEACONS, CACHES.CATEGORIES, CACHES.DRAFTS],
  reducerPath: "beaconApi",
  baseQuery: fetchBaseQuery({
    mode: "cors",
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5037/api",
  }),

  endpoints: (builder) => ({
    getBeacons: builder.query<Beacon[], void>({
      query: () => ENDPOINTS.BEACONS,
      providesTags: () => [{ type: CACHES.BEACONS, id: "LIST" }],
    }),
    createBeacon: builder.mutation<Beacon, Beacon>({
      query: (payload) => {
        var formData = new FormData();
        formData.append("ItemName", payload.ItemName);
        formData.append("ItemDescription", payload.ItemDescription);
        formData.append("CategoryId", payload.CategoryId);
        formData.append("UserId", "D11FAABB-2B72-4E25-88B5-1B9AD7B8A530"); 

        if (payload.Images?.length > 0) {
          payload.Images.forEach((image) => {
            if (image.file instanceof File) {
              formData.append("Images", image.file);
            }
          });
        }

        return {
          url: ENDPOINTS.BEACONS,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: () => [{ type: CACHES.BEACONS, id: "LIST" }],
    }),
    getAllCategories: builder.query<Category[], void>({
      query: () => ENDPOINTS.CATEGORIES,
      providesTags: () => [{ type: CACHES.CATEGORIES, id: "LIST" }],
    }),
    getBeacon: builder.query<Beacon, string>({
      query: (id?: string) => `${ENDPOINTS.BEACONS}/${id}`,
      providesTags: (_result, _error, id) => [{ type: CACHES.BEACONS, id }],
    }),
    getDrafts: builder.query<Beacon[], void>({
      query: () => ENDPOINTS.DRAFTS,
      providesTags: () => [{ type: CACHES.DRAFTS, id: "LIST" }],
    }),
    getDraft: builder.query<Beacon, string>({
      query: (id) => `${ENDPOINTS.DRAFTS}/${id}`,
      providesTags: (_result, _error, id) => [{ type: CACHES.DRAFTS, id }],
    }),
    saveDraft: builder.mutation<Beacon, Beacon>({
      query: (payload) => {
        var formData = new FormData();
        formData.append("ItemName", payload.ItemName || "Untitled Draft");
        formData.append(
          "ItemDescription",
          payload.ItemDescription || "Draft description"
        );
        formData.append("ItemPrice", payload.ItemPrice?.toString() || "0");

        // Only append CategoryId if it exists and isn't empty
        if (payload.CategoryId && payload.CategoryId.trim() !== "") {
          formData.append("CategoryId", payload.CategoryId);
        }

        formData.append("IsDraft", "true");

        if (payload.Images && payload.Images.length > 0) {
          for (let i = 0; i < payload.Images.length; i++) {
            formData.append("Images", payload.Images[i].file);
          }
        }

        return {
          url: ENDPOINTS.DRAFTS,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: () => [{ type: CACHES.DRAFTS, id: "LIST" }],
    }),
    updateDraft: builder.mutation<void, { id: string; draft: Beacon }>({
      query: ({ id, draft }) => {
        var formData = new FormData();
        formData.append("ItemName", draft.ItemName || "");
        formData.append("ItemDescription", draft.ItemDescription || "");
        if (draft.CategoryId) {
          formData.append("CategoryId", draft.CategoryId);
        }
        formData.append("IsDraft", "true");

        if (draft.Images && draft.Images.length > 0) {
          for (let i = 0; i < draft.Images.length; i++) {
            formData.append("Images", draft.Images[i].file);
          }
        }

        return {
          url: `${ENDPOINTS.DRAFTS}/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: CACHES.DRAFTS, id },
      ],
    }),
    deleteDraft: builder.mutation<void, string>({
      query: (id) => ({
        url: `${ENDPOINTS.DRAFTS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: CACHES.DRAFTS, id: "LIST" }],
    }),
    getBeaconById: builder.query<Beacon, string>({
      query: (id) => `/beacons/${id}`,
      providesTags: (result, error, id) => [{ type: CACHES.BEACONS, id }],
    }),
  }),
});

export const {
  useGetBeaconsQuery,
  useCreateBeaconMutation,
  useGetAllCategoriesQuery,
  useGetBeaconQuery,
  useGetDraftsQuery,
  useGetDraftQuery,
  useSaveDraftMutation,
  useUpdateDraftMutation,
  useDeleteDraftMutation,
  useGetBeaconByIdQuery,
} = beaconApi;
