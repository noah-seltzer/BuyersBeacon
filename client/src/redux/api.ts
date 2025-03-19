import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Beacon, Category } from '@/types/beacon'
import Cookies from 'js-cookie'
import { createBeaconFormdata } from '../lib/beacon-utils'

export enum ENDPOINTS {
    CATEGORIES = 'Categories',
    BEACONS = 'Beacons',
}
enum CACHES {
    BEACONS = 'Beacon',
    CATEGORIES = 'Categories',
    DRAFTS = 'Drafts'
}

export const LIST_ID = 'LIST'

export interface GetBeaconQueryInput { drafts?: boolean, userId?: string }

export const beaconApi = createApi({
    tagTypes: [CACHES.BEACONS, CACHES.CATEGORIES, CACHES.DRAFTS],
    reducerPath: 'beaconApi',
    baseQuery: fetchBaseQuery({
        mode: 'cors',
        baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5037/api',
        prepareHeaders: (headers) => {
            const sessionToken = Cookies.get('__session')
            if (sessionToken) {
                headers.set('Authorization', `Bearer ${sessionToken}`)
            }
        }
    }),

    endpoints: (builder) => ({
        getBeacons: builder.query<Beacon[], GetBeaconQueryInput | void>({
            query: (arg) => {
                const drafts = arg && arg.drafts ? true : false
                const id = arg && arg.userId ? arg.userId : undefined

              return {
                url: ENDPOINTS.BEACONS,
                params: {
                  drafts,
                  userId: id
                }
              }
            },
            transformResponse: (response: Beacon[]) =>
                response.map((beacon) => ({
                    ...beacon,
                    imageSet: {
                        imageSetId: beacon.imageSet?.imageSetId,
                        images: beacon.imageSet?.images || [],
                        beaconId: beacon.imageSet?.beaconId
                    }
                }))
                ,
            providesTags: (result, error, arg) => {
                const type = arg && arg.drafts ? CACHES.DRAFTS : CACHES.BEACONS
                return [{ type, id: LIST_ID }]

            }
              
        }),
        createBeacon: builder.mutation<Beacon, Beacon>({
            query: (payload) => {
                const formData = createBeaconFormdata(payload)
                return {
                    url: ENDPOINTS.BEACONS,
                    method: 'POST',
                    body: formData
                }
            },
            invalidatesTags: () => [{ type: CACHES.BEACONS, id: LIST_ID }]
        }),
        getAllCategories: builder.query<Category[], void>({
            query: () => ENDPOINTS.CATEGORIES,
            providesTags: () => [{ type: CACHES.CATEGORIES, id: LIST_ID }]
        }),
        getBeacon: builder.query<Beacon, string>({
            query: (id) => `${ENDPOINTS.BEACONS}/${id}`,
            transformResponse: (response: Beacon) => ({
                ...response,
                imageSet: {
                    imageSetId: response.imageSet?.imageSetId,
                    images: response.imageSet?.images || [],
                    beaconId: response.imageSet?.beaconId
                }
            }),
            providesTags: (_result, _error, id) => [
                { type: CACHES.BEACONS, id }
            ]
        }),
        updateBeacon: builder.mutation<void, { id: string; beacon: Beacon }>({
            query: ({ id, beacon }) => {
                const formData = createBeaconFormdata(beacon)
                return {
                    url: `${ENDPOINTS.BEACONS}/${id}`,
                    method: 'PUT',
                    body: formData
                }
            },
            invalidatesTags: (_result, _error, { id }) => [
                { type: CACHES.BEACONS, id }
            ]
        }),
        deleteBeacon: builder.mutation<void, string>({
            query: (id) => ({
                url: `${ENDPOINTS.BEACONS}/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: () => [
              { type: CACHES.BEACONS, id: LIST_ID },
              { type: CACHES.DRAFTS, id: LIST_ID }
            ]
        })
    })
})

export const {
    useGetBeaconsQuery,
    useCreateBeaconMutation,
    useGetAllCategoriesQuery,
    useGetBeaconQuery,
    useDeleteBeaconMutation
} = beaconApi
