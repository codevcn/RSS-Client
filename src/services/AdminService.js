// import axios from 'axios';
// import { getAdminInfo_api, getAllAdmin_api, createAdmin_api, updateAdmin_api, deleteAdmin_api } from '../apis/Admin';
// import { axios_client, axios_config } from '../configs/axios';

// class StudentService {
//     async requestAdminInfo(api, payload = null) {
//         let response;
//         switch (api) {
//             case 'getAdminInfo':
//                 response = await axios_client.get(getAdminInfo_api, axios_config);
//                 break;
//             case 'getAllAdmin':
//                 response = await axios_client.get(getAllAdmin_api, axios_config);
//                 break;
//             case 'createAdmin':
//                 response = await axios_client.post(createAdmin_api, payload, axios_config);
//                 break;
//             case 'updateAdmin':
//                 response = await axios_client.put(updateAdmin_api.replace('{id}', payload.id), payload.data, axios_config);
//                 break;
//             case 'deleteAdmin':
//                 response = await axios_client.delete(deleteAdmin_api.replace('{id}', payload.id), axios_config);
//                 break;
//             default:
//                 throw new Error('Invalid API type');
//         }
//         return response.data;
//     }
// }

// export const adminService = new StudentService();
import { getAdminInfo_api } from '../apis/Admin'
import { axios_client, axios_config } from '../configs/axios'

class AdminService {
    async getAdminInfo() {
        return axios_client.get(getAdminInfo_api, axios_config)
    }
}

export const AdminService = new AdminService()
