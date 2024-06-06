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
            const pickedSchedule = action.payload
            const prePickedSchedules = current(state).userData.pickedSchedules
            if (prePickedSchedules && prePickedSchedules.length > 0) {
                state.userData.pickedSchedules = [...prePickedSchedules, pickedSchedule]
            } else {
                state.userData.pickedSchedules = [pickedSchedule]
            }
        },
        unPickSchedule: (state, action) => {
            const { scheduleID } = action.payload
            const prePickedSchedules = current(state).userData.pickedSchedules
            let filtered_list = []
            if (prePickedSchedules && prePickedSchedules.length > 0) {
                filtered_list = current(state).userData.pickedSchedules.filter(
                    (preSchedule) => preSchedule.scheduleID !== scheduleID
                )
            }
            state.userData.pickedSchedules = filtered_list.length > 0 ? filtered_list : null
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
} = registerNewTermSlice.actions
