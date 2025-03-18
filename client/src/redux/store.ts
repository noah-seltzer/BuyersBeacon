import { configureStore } from "@reduxjs/toolkit";
import { beaconApi } from "@/redux/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authSlice } from "@/redux/auth-slice";

export const store = configureStore({
    reducer: {
        [beaconApi.reducerPath]: beaconApi.reducer,
        auth: authSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
          .concat(beaconApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)