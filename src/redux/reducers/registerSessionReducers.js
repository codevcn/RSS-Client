import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
    major: null,
    subjects: null,
    subjectInfos: null,
    credits: null,
    teachers: null,
    teacherSchedules: null,
}

export const registerSessionSlice = createSlice({
    name: 'registerSession',
    initialState: initialState,
    reducers: {
        pickMajor: (state, action) => {
            const major_picked = action.payload
            state.major = { code: major_picked.code, name: major_picked.name }
        },

        pickSubject: (state, action) => {
            const subjects_picked = action.payload
            const current_subjects = current(state).subjects
            if (current_subjects && current_subjects.length > 0) {
                state.subjects = [...current_subjects, subjects_picked]
            } else {
                state.subjects = [subjects_picked]
            }
        },
        unPickSubject: (state, action) => {
            const subject_code = action.payload.code
            const filtered_list = current(state).subjects.filter(
                ({ code }) => code !== subject_code
            )
            state.subjects = filtered_list.length > 0 ? filtered_list : null
        },
        pickAllSubjects: (state, action) => {
            state.subjects = action.payload.map(({ code, name }) => ({ code, name }))
        },
        unPickAllSubjects: (state) => {
            state.subjects = null
        },

        pickTeacher: (state, action) => {
            const teacher = action.payload.teacher
            const pickedSubject = action.payload.subject
            const current_teachers = current(state).teachers
            if (current_teachers && current_teachers.length > 0) {
                const exist_teachers = current_teachers.find(
                    ({ subject }) => subject.code === pickedSubject.code
                )
                if (exist_teachers) {
                    state.teachers = current_teachers.map((tchr) => {
                        if (tchr.subject.code === pickedSubject.code) {
                            return {
                                ...tchr,
                                teachers: [...tchr.teachers, teacher],
                            }
                        }
                        return tchr
                    })
                } else {
                    state.teachers = [
                        ...current_teachers,
                        {
                            subject: pickedSubject,
                            teachers: [teacher],
                        },
                    ]
                }
            } else {
                state.teachers = [
                    {
                        subject: pickedSubject,
                        teachers: [teacher],
                    },
                ]
            }
        },
        unPickTeacher: (state, action) => {
            const { teacherCode, subjectCode } = action.payload
            const current_teachers = current(state).teachers
            const teacherObject = current_teachers.find(
                ({ subject }) => subject.code === subjectCode
            )
            const filtered_teachers = teacherObject.teachers.filter(
                ({ code }) => code !== teacherCode
            )
            state.teachers = current_teachers.map((teacher) => {
                if (teacher.subject.code === subjectCode) {
                    return {
                        ...teacher,
                        teachers: filtered_teachers,
                    }
                }
                return teacher
            })
        },

        setUpTeacherSchedule: (state, action) => {
            const { teacher, subject: pickedSubject, schedule } = action.payload
            const current_schedules = current(state).teacherSchedules
            if (current_schedules && current_schedules.length > 0) {
                const exist_schedules = current_schedules.find(
                    ({ subject }) => subject.code === pickedSubject.code
                )
                if (exist_schedules) {
                    state.teacherSchedules = current_schedules.map((schdl) => {
                        if (
                            schdl.subject.code === pickedSubject.code &&
                            teacher.code === schdl.teacher.code
                        ) {
                            return {
                                ...schdl,
                                schedules: [...schdl.schedules, schedule],
                            }
                        }
                        return schdl
                    })
                } else {
                    state.teacherSchedules = [
                        ...current_schedules,
                        {
                            teacher,
                            subject: pickedSubject,
                            schedules: [schedule],
                        },
                    ]
                }
            } else {
                state.teacherSchedules = [
                    {
                        teacher,
                        subject: pickedSubject,
                        schedules: [schedule],
                    },
                ]
            }
        },

        setSubjectInfo: (state, action) => {
            const subjectInfo = action.payload
            const current_infos = current(state).subjectsInfos
            if (current_infos && current_infos.length > 0) {
                const exist_info = current_infos.find(
                    ({ subject }) => subject.code === subjectInfo.subject.code
                )
                if (exist_info) {
                    state.subjectsInfos = current_infos.map((inf) => {
                        if (inf.subject.code === subjectInfo.subject.code) {
                            return {
                                ...inf,
                                ...subjectInfo,
                            }
                        }
                        return inf
                    })
                } else {
                    state.subjectsInfos = [...current_infos, subjectInfo]
                }
            } else {
                state.subjectsInfos = [subjectInfo]
            }
        },

        setUpCredit: (state, action) => {
            const credit = action.payload
            const creditSubject = credit.subject
            const current_credits = current(state).credits
            if (current_credits && current_credits.length > 0) {
                const exist_credit = current_credits.find(
                    ({ subject }) => subject.code === creditSubject.code
                )
                if (exist_credit) {
                    state.credits = current_credits.map((crd) => {
                        if (crd.subject.code === creditSubject.code) {
                            return {
                                ...crd,
                                ...credit,
                            }
                        }
                        return crd
                    })
                } else {
                    state.credits = [...current_credits, credit]
                }
            } else {
                state.credits = [credit]
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
    setSubjectInfo,
    setUpCredit,
    setUpTeacherSchedule,
} = registerSessionSlice.actions
