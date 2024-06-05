import { createSlice, current } from '@reduxjs/toolkit'

const sliceName = 'registerSession'

const initialState = {
    registerSessionInfo: null,
    major: null,
    classesForStudent: {
        pickedClasses: null,
        pickingClass: null,
    },
    subjects: null,
    subjectInfos: null,
    teachers: null,
    subjectSchedules: null,
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

        pickClass: (state, action) => {
            state.classesForStudent.pickingClass = action.payload
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
            const { code: subject_code, forClass: for_class } = action.payload
            const preSubjects = current(state).subjects
            let filtered_list = []
            if (preSubjects && preSubjects.length > 0) {
                filtered_list = preSubjects.filter(
                    ({ code, forClass }) =>
                        code !== subject_code && forClass.code === for_class.code
                )
            }
            state.subjects = filtered_list.length > 0 ? filtered_list : null
        },
        pickAllSubjects: (state, action) => {
            state.subjects = action.payload
        },
        unPickAllSubjects: (state) => {
            state.subjects = null
        },

        pickTeacher: (state, action) => {
            const { teacher, subject: pickedSubject, forClass } = action.payload
            teacher.forClass = forClass
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
            const { teacherCode, subjectCode, forClass: for_class } = action.payload
            const current_teachers = current(state).teachers
            const teacherObject = current_teachers.find(
                ({ subject }) => subject.code === subjectCode
            )
            const filtered_teachers = teacherObject.teachers.filter(
                ({ code, forClass }) => code !== teacherCode && forClass.code === for_class.code
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

        setUpSubjectSchedule: (state, action) => {
            const { teacher, subject: pickedSubject, schedule, forClass } = action.payload
            const current_schedules = current(state).subjectSchedules
            const newSchedule = { ...schedule, teacher, forClass }

            if (current_schedules && current_schedules.length > 0) {
                const exist_schedules = current_schedules.find(
                    ({ subject }) => subject.code === pickedSubject.code
                )
                if (exist_schedules) {
                    state.subjectSchedules = current_schedules.map((schdl) => {
                        if (pickedSubject.code === schdl.subject.code) {
                            return {
                                ...schdl,
                                schedules: [...schdl.schedules, newSchedule],
                            }
                        }
                        return schdl
                    })
                } else {
                    state.subjectSchedules = [
                        ...current_schedules,
                        {
                            subject: pickedSubject,
                            schedules: [newSchedule],
                        },
                    ]
                }
            } else {
                state.subjectSchedules = [
                    {
                        subject: pickedSubject,
                        schedules: [newSchedule],
                    },
                ]
            }
        },

        setSubjectInfo: (state, action) => {
            const subjectInfo = action.payload
            const for_class = subjectInfo.forClass
            const current_infos = current(state).subjectInfos
            if (current_infos && current_infos.length > 0) {
                const exist_info = current_infos.find(
                    ({ subject, forClass }) =>
                        subject.code === subjectInfo.subject.code &&
                        for_class.code === forClass.code
                )
                if (exist_info) {
                    state.subjectInfos = current_infos.map((inf) => {
                        if (
                            inf.subject.code === subjectInfo.subject.code &&
                            for_class.code === inf.forClass.code
                        ) {
                            return {
                                ...inf,
                                ...subjectInfo,
                            }
                        }
                        return inf
                    })
                } else {
                    state.subjectInfos = [...current_infos, subjectInfo]
                }
            } else {
                state.subjectInfos = [subjectInfo]
            }
        },

        // setUpCredit: (state, action) => {
        //     const credit = action.payload
        //     const creditSubject = credit.subject
        //     const current_credits = current(state).credits
        //     if (current_credits && current_credits.length > 0) {
        //         const exist_credit = current_credits.find(
        //             ({ subject }) => subject.code === creditSubject.code
        //         )
        //         if (exist_credit) {
        //             state.credits = current_credits.map((crd) => {
        //                 if (crd.subject.code === creditSubject.code) {
        //                     return {
        //                         ...crd,
        //                         ...credit,
        //                     }
        //                 }
        //                 return crd
        //             })
        //         } else {
        //             state.credits = [...current_credits, credit]
        //         }
        //     } else {
        //         state.credits = [credit]
        //     }
        // },
    },
})

export const {
    pickMajor,
    pickClass,
    pickSubject,
    unPickSubject,
    pickAllSubjects,
    unPickAllSubjects,
    pickTeacher,
    unPickTeacher,
    setSubjectInfo,
    setUpSubjectSchedule,
    setRegisterSessionInfo,
    setClassesOfDatasets,
    setMajorsOfDatasets,
    setSubjectsOfDatasets,
    setTeachersOfDatasets,
    setRoomsOfDatasets,
} = registerSessionSlice.actions
