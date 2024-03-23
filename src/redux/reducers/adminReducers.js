import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    adminInfo: null,
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState: initialState,
    reducers: {
        setAdminInfo: (state, action) => {
            state.adminInfo = action.payload
        },
    },
})

export const { setAdminInfo } = adminSlice.actions
