import { checkAuth_api, loginAdmin_api, loginStudent_api } from '../apis/auth'
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
}

export const authService = new AuthService()
