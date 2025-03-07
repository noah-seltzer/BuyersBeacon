import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Beacon, Category } from '@/types/beacon'

export enum ENDPOINTS {
    CATEGORIES = 'Categories',
    BEACONS = 'Beacons',
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
                    console.log(i);
                    formData.append("Images", payload.Images[i].file);
                }

                formData.entries().forEach(e => console.log(e[0], e[1]));

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
        })
    })
})

export const {
    useGetBeaconsQuery,
    useCreateBeaconMutation,
    useGetAllCategoriesQuery,
    useGetBeaconQuery
} = beaconApi

