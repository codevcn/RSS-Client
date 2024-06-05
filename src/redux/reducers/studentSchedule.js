import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    schedule: null,
}

export const studentScheduleSlice = createSlice({
    name: 'student',
    initialState: initialState,
    reducers: {
        setScheduleData: (state, action) => {
            state.schedule = action.payload
        },
    },
})

export const { setStudentInfo } = studentScheduleSlice.actions
