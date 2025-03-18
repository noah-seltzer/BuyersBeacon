import { User } from '@clerk/nextjs/server'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type AuthState = {
    userId?: string
    token?: string
}
const initialState: AuthState = {
    userId: undefined,
    token: undefined,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserId(state: AuthState, { payload }: PayloadAction<string>) {
            state.userId = payload
        },
        setToken(state: AuthState, { payload }: PayloadAction<string>) {
            state.token = payload
        },

    }
})


export const { setUserId, setToken } = authSlice.actions
