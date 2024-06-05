import { add_register_session_api } from '../apis/register-session'
import { axios_client, axios_config } from '../configs/axios'

class RegisterSessionService {
    async getRegisterSessionForNewTerm() {
        const { data } = await axios_client.get(
            'register-session/get-reg-sess-new-term',
            axios_config
        )
        return data
    }

    async addRegisterSession(data) {
        await axios_client.post(add_register_session_api, data, axios_config)
    }

    async getMajors() {
        const { data } = await axios_client.get('register-session/get-majors', axios_config)
        return data
    }

    async getClassesOfMajor(majorId) {
        const { data } = await axios_client.get(
            'register-session/get-classes/' + majorId,
            axios_config
        )
        return data
    }

    async getSubjectsOfMajor(majorId) {
        const { data } = await axios_client.get(
            'register-session/get-subjects/' + majorId,
            axios_config
        )
        return data
    }

    async getTeachersOfMajor(majorId) {
        const { data } = await axios_client.get(
            'register-session/get-teachers/' + majorId,
            axios_config
        )
        return data
    }

    async searchRegisterSession(regSessCode) {
        const { data } = await axios_client.get(
            'register-session/search-register-session/' + regSessCode,
            axios_config
        )
        return data
    }

    async getRoomsForRegisterSession() {
        const { data } = await axios_client.get('register-session/get-rooms', axios_config)
        return data
    }

    async registerNewTerm(data) {
        await axios_client.post('register-session/reg-new-term', data, axios_config)
    }

    async getResultOfNewTerm(regSessID) {
        const { data } = await axios_client.get(
            'register-session/get-result-new-term/' + regSessID,
            axios_config
        )
        return data
    }
}

export const registerSessionService = new RegisterSessionService()
