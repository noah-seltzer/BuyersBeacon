import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { beaconApi } from "./api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [beaconApi.reducerPath]: beaconApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
          .concat(beaconApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)