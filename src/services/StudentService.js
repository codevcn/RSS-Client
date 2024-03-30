import {
    getAllMajors_api,
    getStudentInfo_api,
    getStudent_api,
    hideStudentInfo_api,
    updateStudentInfo_api,
} from '../apis/student'
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

    async updateStudentInfo(studentID, student) {
        return axios_client.put(updateStudentInfo_api(studentID), student, axios_config)
    }

    async hideStudentInfo(studentID, student) {
        return axios_client.put(hideStudentInfo_api(studentID), student, axios_config)
    }

    // async getAllMajors() {
    //     try {
    //         const response = await axios_client.get(getAllMajors_api, axios_config)
    //         return response.data
    //     } catch (error) {
    //         console.error('Error getting student info:', error)
    //         throw error
    //     }
    // }

    async getAllMajors() {
        return axios_client.get(getAllMajors_api, axios_config)
    }
}

export const studentService = new StudentService()
