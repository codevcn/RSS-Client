export const getStudentInfo_api = 'http://localhost:8080/api/student/get-all-student'
//const updateStudentInfo_api = 'http://localhost:8080/api/student/get-student/';
export const getAllMajors_api = 'http://localhost:8080/api/majors/all'

export const getStudent_api = (studentID) => '/student/get-student/' + studentID

export const updateStudentInfo_api = (studentID) => '/student/update-student/' + studentID

export const hideStudent_api = (studentID) => `/student/hide/${studentID}`
