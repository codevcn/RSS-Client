export const getStudentInfo_api = 'http://localhost:8080/api/student/get-all-student'

export const getAllMajors_api = '/major/get-all-major'

export const getStudent_api = (studentID) => '/student/get-student/' + studentID

export const updateStudentInfo_api = (studentID) => '/student/update-student/' + studentID

export const hideStudentInfo_api = (studentID) => '/student/hide-student/' + studentID
