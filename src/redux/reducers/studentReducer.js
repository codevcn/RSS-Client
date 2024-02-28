import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    studentInfo: null,
}

export const studentSlice = createSlice({
    name: 'student',
    initialState: initialState,
    reducers: {
        setStudentInfo: (state, action) => {
            state.studentInfo = action.payload
        },
    },
})

export const { setStudentInfo } = studentSlice.actions
