import { axios_client } from '../configs/axios'
import { login_api } from '../apis/auth'

class AuthService {
    async login({ studentUsername, studentPassword }) {
        return axios_client.post(login_api, {
            studentUsername,
            password: studentPassword,
        })
    }
}

export const authService = new AuthService()
