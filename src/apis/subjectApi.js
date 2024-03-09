import { axios_client } from '../configs/axios.js'

const getSubjectInfo_api = async (input) => {
    try {
        const response = await axios_client.get(`/subjects/${input}`)
        return response.data
    } catch (error) {
        throw new Error('Không tìm thấy môn học')
    }
}

export { getSubjectInfo_api }
