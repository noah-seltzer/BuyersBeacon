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

export interface GetAllBeaconsQuery {searchQuery: string, selectedOption: string }


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
                formData.append('UserId', 'D11FAABB-2B72-4E25-88B5-1B9AD7B8A530')
                if (payload.Images.length > 0) {
                    payload.Images.forEach(image => {
                            formData.append("Images", image.file);
                    });
                    formData.append('Image', payload.Images[0].file)
                }

                return {
                    url: ENDPOINTS.BEACONS,
                    method: 'POST',
                    headers: {
                        // set undefined so that browser can dynamically calculate
                        'Content-Type': undefined
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
        getSearchResults: builder.query<Beacon[], GetAllBeaconsQuery>({
            query: (payload) => {
                return {
                    url: `${ENDPOINTS.BEACONS}/search`,
                    method: `GET`,
                    body: payload
                }
            }
        })

    })
})

export const {
    useGetBeaconsQuery,
    useCreateBeaconMutation,
    useGetAllCategoriesQuery,
    useGetBeaconQuery,
    useGetSearchResultsQuery
} = beaconApi

