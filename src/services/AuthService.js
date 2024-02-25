import { axios_client } from '../configs/axios'
import { login_api } from '../apis/auth'

class AuthService {
    async login({ studentID, studentPassword }) {
        return axios_client.post(login_api, {
            credentials: { studentID, studentPassword },
        })
    }
}

export const authService = new AuthService()
