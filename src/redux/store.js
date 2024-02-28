import { configureStore } from '@reduxjs/toolkit'
import { authSilce } from './reducers/authReducers'
import { studentSlice } from './reducers/studentReducer'

export default configureStore({
    reducer: {
        [authSilce.name]: authSilce.reducer,
        [studentSlice.name]: studentSlice.reducer,
    },
})
