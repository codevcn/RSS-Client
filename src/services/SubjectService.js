import { getSubjectInfo_api } from '../apis/subjectApi'
import { axios_client, axios_config } from '../configs/axios'

class SearchService {
    async getStudentInfo() {
        return axios_client.get(getSubjectInfo_api, axios_config)
    }
}

export const searchService = new SearchService()
