import { getAdminInfo_api, updateAdmin_api } from '../apis/admin'
import { axios_client, axios_config } from '../configs/axios'

class AdminService {
    async getAdminInfo(adminUserName) {
        return axios_client.get(getAdminInfo_api(adminUserName), axios_config)
    }
    async updateAdminInfo(adminId, adminInfo) {
        return axios_client.put(updateAdmin_api(adminId), adminInfo, axios_config)
    }
}

export const adminService = new AdminService()
