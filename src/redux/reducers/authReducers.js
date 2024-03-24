import { createSlice } from '@reduxjs/toolkit'
import {
    AUTH_STATUS_AUTHENTICATED,
    AUTH_STATUS_IS_LOGOUTED,
    AUTH_STATUS_NOT_AUTHENTICATED,
} from '../../utils/constants/auth.js'

const initialState = {
    authStatus: null,
    accountInfo: null,
}

export const authSilce = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        checkAuthSuccess: (state) => {
            state.authStatus = AUTH_STATUS_AUTHENTICATED
        },
        checkAuthFail: (state) => {
            state.authStatus = AUTH_STATUS_NOT_AUTHENTICATED
        },
        logout: (state) => {
            state.authStatus = AUTH_STATUS_IS_LOGOUTED
        },
        setAccountInfo: (state, action) => {
            state.accountInfo = action.payload
        },
    },
})

export const { checkAuthFail, checkAuthSuccess, logout, setAccountInfo } = authSilce.actions
