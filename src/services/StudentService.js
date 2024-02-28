import { getStudentInfo_api } from '../apis/student'
import { axios_client, axios_config } from '../configs/axios'

class StudentService {
    async getStudentInfo() {
        return axios_client.get(getStudentInfo_api, axios_config)
    }
}

export const studentService = new StudentService()
