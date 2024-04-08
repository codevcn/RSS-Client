import {
    createSubjectInfo_api,
    getAdminInfo_api,
    getMajorInfo_api,
    getOneSubjectInfo_api,
    getSubjectInfo_api,
    hideSubject_api,
    updateAdmin_api,
    updateSubjectInfo_api,
    getAllUsername_api,
    ChangePass_api,
    getAllIDcard_api
} from '../apis/Admin'
import { axios_client, axios_config } from '../configs/axios'

class AdminService {
    async getAdminInfo() {
        return axios_client.get(getAdminInfo_api(), axios_config)
    }
    async updateAdminInfo(adminInfo) {
        return axios_client.put(updateAdmin_api, adminInfo, axios_config)
    }
    async getOneSubjectInfo(id) {
        return axios_client.get(getOneSubjectInfo_api(id), axios_config)
    }
    async getAllSubjectInfo() {
        return axios_client.get(getSubjectInfo_api, axios_config)
    }
    async createSubjectInfo(subjects) {
        return axios_client.post(createSubjectInfo_api, subjects, axios_config)
    }
    async updateSubjectInfo(id, subjects) {
        return axios_client.put(updateSubjectInfo_api(id), subjects, axios_config)
    }
    async hideSubject(subjecttID) {
        return axios_client.put(hideSubject_api(subjecttID), subjecttID, axios_config)
    }
    async getAllMajors() {
        return axios_client.get(getMajorInfo_api, axios_config)
    }
    async getAllUsername() {
        return axios_client.get(getAllUsername_api, axios_config)
    }
    async ChangePass(pass) {
        return axios_client.put(ChangePass_api, pass, axios_config)
    }
    async getAllIDcard() {
        return axios_client.get(getAllIDcard_api, axios_config)
    }
}

export const adminService = new AdminService()
