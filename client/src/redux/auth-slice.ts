import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/types/user'

export type AuthState = {
    userId?: string
    token?: string
    user?: User
}
const initialState: AuthState = {
    userId: undefined,
    token: undefined,
    user: undefined
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
        setUser(state: AuthState, { payload }: PayloadAction<User>) {
            state.user = payload
        }
        
    }
})


export const { setUserId, setToken, setUser } = authSlice.actions
