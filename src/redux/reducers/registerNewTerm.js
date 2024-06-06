import { createSlice, current } from '@reduxjs/toolkit'

const sliceName = 'registerNewTermSlice'

const initialState = {
    regSessInfo: { regSessID: null },
    schedules: null,
    userData: {
        pickedSchedules: null,
    },
    result: null,
    fetchRegisterStatus: 'loading',
}

export const registerNewTermSlice = createSlice({
    name: sliceName,
    initialState: initialState,
    reducers: {
        setFetchRegisterStatus: (state, action) => {
            state.fetchRegisterStatus = action.payload
        },

        createSchedulesForNewTerm: (state, action) => {
            const { schedules, regSessID } = action.payload
            state.regSessInfo.regSessID = regSessID
            state.schedules = schedules
        },

        pickSchedule: (state, action) => {
            const pickedSchedules = action.payload
            const prePickedSchedules = current(state).userData.pickedSchedules
            if (prePickedSchedules && prePickedSchedules.length > 0) {
                state.userData.pickedSchedules = [...prePickedSchedules, ...pickedSchedules]
            } else {
                state.userData.pickedSchedules = pickedSchedules
            }
        },
        unPickSchedule: (state, action) => {
            const pickedSchedules = action.payload
            const prePickedSchedules = current(state).userData.pickedSchedules
            let filtered_list = []
            if (prePickedSchedules && prePickedSchedules.length > 0) {
                filtered_list = prePickedSchedules.filter(
                    (preSchedule) =>
                        !pickedSchedules.some(
                            ({ scheduleID }) => preSchedule.scheduleID === scheduleID
                        )
                )
            }
            state.userData.pickedSchedules = filtered_list.length > 0 ? filtered_list : null
        },
        clearSchedules: (state) => {
            state.userData.pickedSchedules = null
        },

        setResultOfNewTerm: (state, action) => {
            state.result = action.payload
        },
    },
})

export const {
    createSchedulesForNewTerm,
    pickSchedule,
    unPickSchedule,
    setResultOfNewTerm,
    setFetchRegisterStatus,
    clearSchedules,
} = registerNewTermSlice.actions
