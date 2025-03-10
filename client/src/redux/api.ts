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
                return {
                    url: ENDPOINTS.BEACONS,
                    method: 'POST',
                    body: payload
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

