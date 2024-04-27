import { checkAuth_api, loginAdmin_api, loginStudent_api, logoutUser_api } from '../apis/auth'
import { axios_client, axios_config } from '../configs/axios'

class AuthService {
    async loginStudent({ username, password }) {
        await axios_client.post(
            loginStudent_api,
            {
                username,
                password,
            },
            axios_config
        )
    }

    async loginAdmin({ username, password }) {
        await axios_client.post(
            loginAdmin_api,
            {
                username,
                password,
            },
            axios_config
        )
    }

    async checkAuth() {
        const { data } = await axios_client.get(checkAuth_api, axios_config)
        return data
    }

    async logoutUser() {
        await axios_client.post(logoutUser_api, {}, axios_config)
    }
}

export const authService = new AuthService()
