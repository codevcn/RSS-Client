import { axios_client, axios_config } from '../configs/axios'
import { login_api } from '../apis/auth'

class AuthService {
    async login({ studentUsername, studentPassword }) {
        return axios_client.post(
            login_api,
            {
                username: studentUsername,
                password: studentPassword,
            },
            axios_config
        )
    }
}

export const authService = new AuthService()
