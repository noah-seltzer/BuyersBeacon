import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Beacon, Category } from '@/types/beacon'

export enum ENDPOINTS {
    CATEGORIES = 'Categories',
    BEACONS = 'Beacons',
    DRAFTS = 'Beacons/drafts'
}
enum CACHES {
    BEACONS = "Beacon",
    CATEGORIES = 'Categories'
}


export const beaconApi = createApi({
    tagTypes: [CACHES.BEACONS, CACHES.CATEGORIES],
    reducerPath: 'beaconApi',
    baseQuery: fetchBaseQuery({
        mode: 'cors',
        baseUrl: process.env.API_URL
    }),

    endpoints: (builder) => ({
        getBeacons: builder.query<Beacon[], void>({
            query: () => ENDPOINTS.BEACONS,
            providesTags: () => [{ type: CACHES.BEACONS, id: 'LIST' }]
        }),
        createBeacon: builder.mutation<Beacon, Beacon>({
            query: (payload) => {
                var formData = new FormData();
                formData.append('ItemName', payload.ItemName);
                formData.append('ItemDescription', payload.ItemDescription);
                formData.append('CategoryId', payload.CategoryId);

                for (let i = 0; i < payload.Images.length; i++) {
                    formData.append("Images", payload.Images[i].file);
                }

                return {
                    url: ENDPOINTS.BEACONS,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data;'
                    },
                    body: formData,
                }
            },
            invalidatesTags: () => [{ type: CACHES.BEACONS, id: 'LIST' }]
        }),
        getAllCategories: builder.query<Category[], void>({
            query: () => ENDPOINTS.CATEGORIES,
            providesTags: () => [{ type: CACHES.CATEGORIES, id: "LIST" }]
        }),
        getBeacon: builder.query<Beacon, string>({
            query: (id?: string) => `${ENDPOINTS.BEACONS}/${id}`,
            providesTags: (_result, _error, id) => [{ type: CACHES.BEACONS, id }]
        }),
        getDrafts: builder.query<Beacon[], void>({
            query: () => ENDPOINTS.DRAFTS,
            providesTags: () => [{ type: CACHES.BEACONS, id: 'DRAFTS' }]
        }),
        saveDraft: builder.mutation<Beacon, Beacon>({
            query: (payload) => {
                var formData = new FormData();
                formData.append('ItemName', payload.ItemName);
                formData.append('ItemDescription', payload.ItemDescription);
                formData.append('CategoryId', payload.CategoryId);
                formData.append('IsDraft', 'true');

                for (let i = 0; i < (payload.Images?.length || 0); i++) {
                    formData.append("Images", payload.Images[i].file);
                }

                return {
                    url: ENDPOINTS.BEACONS,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: () => [{ type: CACHES.BEACONS, id: 'DRAFTS' }]
        }),
    })
})

export const {
    useGetBeaconsQuery,
    useCreateBeaconMutation,
    useGetAllCategoriesQuery,
    useGetBeaconQuery,
    useGetDraftsQuery,
    useSaveDraftMutation
} = beaconApi

