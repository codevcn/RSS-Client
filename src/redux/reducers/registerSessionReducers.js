import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
    data: {
        subjects: null,
        major: null,
        schedules: null,
        credits: null,
        teachers: null,
    },
}

export const registerSessionSlice = createSlice({
    name: 'registerSession',
    initialState: initialState,
    reducers: {
        pickMajor: (state, action) => {
            const major_picked = action.payload
            state.data.major = { code: major_picked.code, name: major_picked.name }
        },

        pickSubject: (state, action) => {
            const subjects_picked = action.payload
            const current_subjects = current(state).data.subjects
            state.data.subjects = current_subjects
                ? [...current_subjects, { code: subjects_picked.code, name: subjects_picked.name }]
                : [{ code: subjects_picked.code, name: subjects_picked.name }]
        },
        unPickSubject: (state, action) => {
            const subject_code = action.payload.code
            const filtered_list = current(state).data.subjects.filter(
                ({ code }) => code !== subject_code
            )
            state.data.subjects = filtered_list.length > 0 ? filtered_list : null
        },
        pickAllSubjects: (state, action) => {
            state.data.subjects = action.payload.map(({ code, name }) => ({ code, name }))
        },
        unPickAllSubjects: (state) => {
            state.data.subjects = null
        },

        pickTeacher: (state, action) => {
            const { code, name, subject } = action.payload
            const current_teachers = current(state).data.teachers
            if (current_teachers) {
                if (current_teachers.length === 2) {
                    throw new Error('Mỗi môn học không được có hơn 2 giảng viên giảng dạy')
                }

                state.data.teachers = [
                    ...current_teachers,
                    {
                        subject: {
                            code: subject.code,
                            name: subject.name,
                        },
                        code: code,
                        name: name,
                    },
                ]
            } else {
                state.data.teachers = [
                    {
                        subject: {
                            code: subject.code,
                            name: subject.name,
                        },
                        code: code,
                        name: name,
                    },
                ]
            }
        },
        unPickTeacher: (state, action) => {
            const { code: teacher_code, subject: picked_subject } = action.payload
            const filtered_list = current(state).data.teachers.filter(({ code, subject }) => {
                if (subject.code === picked_subject.code && code === teacher_code) {
                    return false
                } else {
                    return true
                }
            })
            state.data.teachers = filtered_list.length > 0 ? filtered_list : null
        },

        setUpSchedule: (state, action) => {
            const {
                subject: picked_subject,
                teamGroup,
                nameOfClass,
                dayOfWeek,
                numberOfSessions,
                startingSession,
                roomName,
            } = action.payload
            const current_schedules = current(state).data.schedules
            if (current_schedules) {
                state.data.schedules = current_schedules.map((schedule) => {
                    if (schedule.subject.code === picked_subject.code) {
                        return {
                            ...schedule,
                            teamGroup,
                            nameOfClass,
                            dayOfWeek,
                            numberOfSessions,
                            startingSession,
                            roomName,
                        }
                    } else {
                        return schedule
                    }
                })
            } else {
                state.data.schedules = [
                    {
                        subject: { code: picked_subject.code },
                        teamGroup,
                        nameOfClass,
                        dayOfWeek,
                        numberOfSessions,
                        startingSession,
                        roomName,
                    },
                ]
            }
        },
    },
})

export const {
    pickMajor,
    pickSubject,
    unPickSubject,
    pickAllSubjects,
    unPickAllSubjects,
    pickTeacher,
    unPickTeacher,
    setUpSchedule,
} = registerSessionSlice.actions
