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
        logoutUser: (state) => {
            state.authStatus = AUTH_STATUS_IS_LOGOUTED
            state.accountInfo = null
        },
        setAccountInfo: (state, action) => {
            state.accountInfo = action.payload
        },
    },
})

export const { checkAuthFail, checkAuthSuccess, logoutUser, setAccountInfo } = authSilce.actions
