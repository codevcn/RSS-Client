import {
    addStudentInfo_api,
    deleteCourseInfor_api,
    getAllAccount_api,
    getAllMajors_api,
    getAllRegistration_api,
    getAllStudent_api,
    getStudentInfo_api,
    getStudent_api,
    hideStudentInfo_api,
    updateStudentInfo_api,
} from '../apis/student'
import { axios_client, axios_config } from '../configs/axios'

class StudentService {
    async getStudentInfo() {
        return axios_client.get(getStudentInfo_api, axios_config)
    }

    async getAllStudent() {
        return axios_client.get(getAllStudent_api, axios_config)
    }

    async getAllAccount() {
        return axios_client.get(getAllAccount_api, axios_config)
    }

    async getAllRegistration() {
        return axios_client.get(getAllRegistration_api, axios_config)
    }

    async getStudent(studentID) {
        return axios_client.get(getStudent_api(studentID), axios_config)
    }

    async updateStudentInfo(studentID, student) {
        return axios_client.put(updateStudentInfo_api(studentID), student, axios_config)
    }

    async hideStudentInfo(studentID) {
        return axios_client.put(hideStudentInfo_api(studentID), studentID, axios_config)
    }

    async deleteCourseInfor(receiptSubjectID) {
        // return axios_client.delete(deleteCourseInfor_api(receiptSubjectID), axios_config)
        try {
            await axios_client.delete(deleteCourseInfor_api(receiptSubjectID), axios_config)
            return true // hoặc giá trị phù hợp để chỉ ra rằng việc xóa đã thành công
        } catch (error) {
            console.error('Error deleting course:', error)
            throw error // hoặc xử lý lỗi tùy thuộc vào nhu cầu của bạn
        }
    }

    async getAllMajors() {
        return axios_client.get(getAllMajors_api, axios_config)
    }

    async addStudent(studentWithAccount) {
        try {
            const response = await axios_client.post(
                addStudentInfo_api,
                studentWithAccount,
                axios_config
            )
            return response.data
        } catch (error) {
            console.error('Error adding student:', error)
            throw error
        }
    }
}

export const studentService = new StudentService()
