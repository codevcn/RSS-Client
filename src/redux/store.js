import { configureStore } from '@reduxjs/toolkit'
import { adminSlice } from './reducers/adminReducers'
import { authSilce } from './reducers/authReducers'
import { studentSlice } from './reducers/studentReducer'

export default configureStore({
    reducer: {
        [authSilce.name]: authSilce.reducer,
        [studentSlice.name]: studentSlice.reducer,
        [adminSlice.name]: adminSlice.reducer,
    },
})
