import { getStudentInfo_api } from '../apis/student'
import { getStudent_api } from '../apis/student'
import { updateStudentInfo_api } from '../apis/student'
import { hideStudent_api } from '../apis/student'
import { axios_client, axios_config } from '../configs/axios'

class StudentService {
    async getStudentInfo() {
        try {
            return axios_client.get(getStudentInfo_api, axios_config)
        } catch (error) {
            console.error('Error getting student info:', error)
            throw error
        }
    }

    async getStudent(studentID) {
        return axios_client.get(getStudent_api(studentID), axios_config)
    }

    // async updateStudentInfo(studentID, student) {
    //     return axios_client.get(updateStudentInfo_api(studentID), student, axios_config)
    // }

    async updateStudentInfo(studentID, student) {
        try {
            const response = await axios_client.put(
                updateStudentInfo_api(studentID),
                student,
                axios_config
            )
            return response.data
        } catch (error) {
            //console.error('Error updating student info:', error);
            throw error
        }
    }

    async hideStudent(studentID) {
        try {
            const response = await axios_client.put(
                hideStudent_api(studentID),
                {},
                axios_config
            )
            return response.data
        } catch (error) {
            console.error('Error hiding student:', error)
            throw error
        }
    }
}

export const studentService = new StudentService()
