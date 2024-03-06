import { getStudentInfo_api } from '../apis/student'
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
}

export const studentService = new StudentService()
