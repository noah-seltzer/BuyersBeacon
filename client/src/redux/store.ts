import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { beaconApi } from "./api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'



const listenerMiddleware = createListenerMiddleware()

export const store = configureStore({
    reducer: {
        [beaconApi.reducerPath]: beaconApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
          // NOTE: Since this can receive actions with functions inside,
          // it should go before the serializability check middleware
        //   .prepend(listenerMiddleware.middleware)
          .concat(beaconApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)