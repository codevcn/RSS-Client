import { createSlice, current } from '@reduxjs/toolkit'

const sliceName = 'registerSession'

const initialState = {
    registerSessionInfo: null,
    major: null,
    subjects: null,
    subjectSchedules: null,
    changingSchedule: null,
    finalResult: null,
    datasets: {
        majors: null,
        classes: null,
        subjects: null,
        teachers: null,
        rooms: null,
    },
}

export const registerSessionSlice = createSlice({
    name: sliceName,
    initialState: initialState,
    reducers: {
        setMajorsOfDatasets: (state, action) => {
            state.datasets.majors = action.payload
        },
        setClassesOfDatasets: (state, action) => {
            state.datasets.classes = action.payload
        },
        setSubjectsOfDatasets: (state, action) => {
            state.datasets.subjects = action.payload
        },
        setTeachersOfDatasets: (state, action) => {
            state.datasets.teachers = action.payload
        },
        setRoomsOfDatasets: (state, action) => {
            state.datasets.rooms = action.payload
        },

        setRegisterSessionInfo: (state, action) => {
            state.registerSessionInfo = action.payload
        },

        pickMajor: (state, action) => {
            state.major = action.payload
        },

        pickSubject: (state, action) => {
            const subject_picked = action.payload
            const current_subjects = current(state).subjects
            if (current_subjects && current_subjects.length > 0) {
                state.subjects = [...current_subjects, subject_picked]
            } else {
                state.subjects = [subject_picked]
            }
        },
        unPickSubject: (state, action) => {
            const { code: subject_code } = action.payload
            const preSubjects = current(state).subjects
            let filtered_list = []
            if (preSubjects && preSubjects.length > 0) {
                filtered_list = preSubjects.filter(({ code }) => code !== subject_code)
            }
            state.subjects = filtered_list.length > 0 ? filtered_list : null
        },
        pickAllSubjects: (state, action) => {
            state.subjects = action.payload
        },
        unPickAllSubjects: (state) => {
            state.subjects = null
        },

        addSubjectSchedule: (state, action) => {
            const { subject: pickedSubject, schedule: newSchedule } = action.payload
            const current_schedules = current(state).subjectSchedules
            if (current_schedules && current_schedules.length > 0) {
                let maxId = Math.max(...current_schedules.map((obj) => obj.id))
                state.subjectSchedules = [
                    ...current_schedules,
                    {
                        subject: pickedSubject,
                        schedule: { id: maxId, ...newSchedule },
                    },
                ]
            } else {
                state.subjectSchedules = [
                    {
                        subject: pickedSubject,
                        schedule: { id: 1, ...newSchedule },
                    },
                ]
            }
        },
        setUpSubjectSchedule: (state, action) => {
            const { subject: pickedSubject, schedule: typedSchedule } = action.payload
            const current_schedules = current(state).subjectSchedules

            if (current_schedules && current_schedules.length > 0) {
                const exist_schedule = current_schedules.find(
                    ({ schedule }) => schedule.id === typedSchedule.id
                )
                if (exist_schedule) {
                    state.subjectSchedules = current_schedules.map((schdl) => {
                        if (schdl.schedule.id === typedSchedule.id) {
                            return {
                                ...schdl,
                                schedule: typedSchedule,
                            }
                        }
                        return schdl
                    })
                } else {
                    state.subjectSchedules = [
                        ...current_schedules,
                        {
                            subject: pickedSubject,
                            schedule: typedSchedule,
                        },
                    ]
                }
            } else {
                state.subjectSchedules = [
                    {
                        subject: pickedSubject,
                        schedule: typedSchedule,
                    },
                ]
            }
        },
        removeSchedule: (state, action) => {
            const { scheduleID } = action.payload
            const current_schedules = current(state).subjectSchedules
            const schedules_after_remove =
                current_schedules && current_schedules.length > 0
                    ? current_schedules.filter(({ schedule }) => schedule.id !== scheduleID)
                    : null
            state.subjectSchedules =
                schedules_after_remove.length === 0 ? null : schedules_after_remove
        },
        setChangingSchedule: (state, action) => {
            state.changingSchedule = action.payload
        },
    },
})

export const {
    pickAllSubjects,
    pickMajor,
    pickSubject,
    setClassesOfDatasets,
    setMajorsOfDatasets,
    setRegisterSessionInfo,
    setRoomsOfDatasets,
    setSubjectsOfDatasets,
    setUpSubjectSchedule,
    unPickAllSubjects,
    unPickSubject,
    setTeachersOfDatasets,
    addSubjectSchedule,
    removeSchedule,
    setChangingSchedule,
} = registerSessionSlice.actions
