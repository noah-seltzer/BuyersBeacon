import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Beacon } from '../types/beacon'

console.log('api', process.env.API_URL)

export const beaconApi = createApi({
    tagTypes: ['Beacon'],
    reducerPath: 'beaconApi',
    baseQuery: fetchBaseQuery({ 
        mode: 'cors',
        baseUrl: process.env.API_URL }),
    
    endpoints: (builder) => ({
        getBeacons: builder.query<Beacon[], void>({
            query: () => 'beacons',
            
            // transformResponse: (response: any) => {
            //     console.log('response', response)
            //     return response
            // },
            providesTags: (result, error, id) => [{ type: 'Beacon', id: 'LIST'}]
            // transformResponse: (response: { data: any }, meta, arg) => response
            // providesTags: () => [{ type: 'Beacons', id: 'LIST' }]
            // providesTags: () => [{ type: 'Beacons', id: LIST_ID }]
        }),
        createBeacon: builder.mutation<Beacon, Beacon>({
            query: (payload) => {
                return {
                    url: 'beacons',
                    method: 'POST',
                    body: payload
                }
            },
            // transformResponse: (response: any) => {
            //     console.log('response', response)
            //     return response
            // },
            invalidatesTags: () => [{ type: 'Beacon', id: 'LIST'}]
            // transformResponse: (response: { data: any }, meta, arg) => response
            // providesTags: () => [{ type: 'Beacons', id: 'LIST' }]
            // providesTags: () => [{ type: 'Beacons', id: LIST_ID }]
        }),
    })
})

export const { useGetBeaconsQuery, useCreateBeaconMutation } = beaconApi
