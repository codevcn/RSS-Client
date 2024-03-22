import { login_api } from '../apis/auth'
import { axios_client, axios_config } from '../configs/axios'

class AuthService {
    async login({ username, password }) {
        return axios_client.post(
            login_api,
            {
                username,
                password,
            },
            axios_config
        )
    }
}

export const authService = new AuthService()
