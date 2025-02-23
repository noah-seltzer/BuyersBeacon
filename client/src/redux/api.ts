import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Beacon } from '@/types/beacon'

export const beaconApi = createApi({
    tagTypes: ['Beacon'],
    reducerPath: 'beaconApi',
    baseQuery: fetchBaseQuery({
        mode: 'cors',
        baseUrl: process.env.API_URL
    }),

    endpoints: (builder) => ({
        getBeacons: builder.query<Beacon[], void>({
            query: () => 'beacons',
            providesTags: () => [{ type: 'Beacon', id: 'LIST' }]
        }),
        createBeacon: builder.mutation<Beacon, Beacon>({
            query: (payload) => {
                return {
                    url: 'beacons',
                    method: 'POST',
                    body: payload
                }
            },
            invalidatesTags: () => [{ type: 'Beacon', id: 'LIST' }]
        }),
    })
})

export const { useGetBeaconsQuery, useCreateBeaconMutation } = beaconApi
