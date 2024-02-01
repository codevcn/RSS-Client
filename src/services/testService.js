import { first_test_api, second_test_api } from '../apis/test'
import { axios_client } from '../configs/axios'

class TestService {
    async fetchData(payload) {
        return axios_client.post(second_test_api, payload)
    }

    async testException() {
        return axios_client.get(first_test_api)
    }
}

export const testService = new TestService()
