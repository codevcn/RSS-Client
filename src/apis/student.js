export const getStudentInfo_api = 'http://localhost:8080/api/student/get-all-student'

export const getAllStudent_api = '/student/all-student'

export const getAllAccount_api = '/student/all-account'

export const getAllRegistration_api = '/student/get-all-course-registration-information'

export const getAllMajors_api = '/major/get-all-major'

export const getStudent_api = (studentID) => '/student/get-student/' + studentID

export const updateStudentInfo_api = (studentID) => '/student/update-student/' + studentID

export const hideStudentInfo_api = (studentID) => '/student/hide-student/' + studentID

// export const deleteCourseInfor_api = (receiptSubjectID) => '/student/delete-course/' + receiptSubjectID
export const deleteCourseInfor_api = (receiptSubjectID) =>
    '/student/delete-course/' + receiptSubjectID
// export const deleteCourseInfor_api = (receiptSubjectID) => ({
//     url: `${import.meta.env.VITE_SERVER_API}/student/delete-course/${receiptSubjectID}`,
//     method: 'DELETE'
// })

export const addStudentInfo_api = '/student/create-student'
