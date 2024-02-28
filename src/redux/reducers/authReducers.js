import { createSlice } from '@reduxjs/toolkit'
import {
    AUTH_STATUS_AUTHENTICATED,
    AUTH_STATUS_NOT_AUTHENTICATED,
    AUTH_STATUS_IS_LOGOUTED,
} from '../../utils/constants/authConstants.js'

const initialState = {
    authStatus: null,
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
    },
})

export const { checkAuthFail, checkAuthSuccess, logout } = authSilce.actions
